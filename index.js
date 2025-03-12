// Módulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");


// Inicia a operação
operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar conta",
          "Consultar saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "Criar conta") {
        createAccount();
      } else if (action === "Consultar saldo") {
        getAccountBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Tenha um bom dia!"));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
}

// Função para criar uma conta
function createAccount() {
  console.log(chalk.bgGreen.black("Você escolheu criar uma conta!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));

  buildAccount();
}

// Função para construir a conta
function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a conta:",
      },
      {
        type: "password",
        name: "password",
        message: "Digite uma senha para a conta:",
        mask: "*",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      const password = answer["password"];

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Essa conta já existe, escolha outro nome")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify({ balance: 0, password: password }),
        function (err) {
          console.log(err);
        }
      );
      console.log(chalk.bgGreen.black("Conta criada com sucesso!"));
      operation();
    })
    .catch((err) => console.log(err));
}

// Função para verificar a senha
function verifyPassword(accountName, password) {
  const accountData = getAccount(accountName);
  return accountData.password === password;
}

// Função para depositar dinheiro
function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta:",
      },
      {
        type: "password",
        name: "password",
        message: "Digite a senha da conta:",
        mask: "*",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      const password = answer["password"];

      if (!checkAccount(accountName)) {
        return deposit();
      }

      if (!verifyPassword(accountName, password)) {
        console.log(chalk.bgRed.black("Senha incorreta!"));
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Digite o valor que deseja depositar:",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// Função para verificar se a conta existe
function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("Essa conta não existe, escolha outro nome!")
    );
    return false;
  } else {
    return true;
  }
}

// Função para adicionar dinheiro à conta
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente!"));
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Depósito no valor de R$${amount} realizado com sucesso!`)
  );
}

// Função para obter os dados da conta
function getAccount(accountName) {
  const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });

  return JSON.parse(accountJson);
}

// Função para consultar o saldo
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta:",
      },
      {
        type: "password",
        name: "password",
        message: "Digite a senha da conta:",
        mask: "*",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      const password = answer["password"];

      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      if (!verifyPassword(accountName, password)) {
        console.log(chalk.bgRed.black("Senha incorreta!"));
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(
        chalk.bgBlue.black(`Seu saldo é de R$${accountData.balance}`)
      );

      operation();
    })
    .catch((err) => console.log(err));
}

// Função para sacar dinheiro
function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta:",
      },
      {
        type: "password",
        name: "password",
        message: "Digite a senha da conta:",
        mask: "*",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      const password = answer["password"];

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      if (!verifyPassword(accountName, password)) {
        console.log(chalk.bgRed.black("Senha incorreta!"));
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Digite o valor que deseja sacar:",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// Função para remover dinheiro da conta
function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente!"));
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Saldo insuficiente!"));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Saque no valor de R$${amount} realizado com sucesso!`)
  );

  operation();
}