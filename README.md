# 📰 Sistema Bancário em Node.js

Este projeto é um sistema bancário simples desenvolvido em Node.js, que permite aos usuários criar contas, consultar saldos, depositar e sacar dinheiro. O sistema é totalmente baseado em linha de comando (CLI) e utiliza o pacote inquirer para interações com o usuário e chalk para estilização de textos no terminal.

## Funcionalidades:
- **Criar Conta**: Cria uma nova conta bancária com um nome de usuário e senha, salvando os dados em um arquivo JSON com saldo inicial de 0 e a senha definida.
- **Consultar Saldo**: Consulta o saldo de uma conta existente, exigindo o nome da conta e a senha.
- **Depositar**: Realiza um depósito em uma conta existente, somando o valor ao saldo atual.
- **Sacar**: Realiza um saque de uma conta, verificando se o saldo é suficiente para a operação.
- **Sair**: Finaliza o programa com uma mensagem de despedida.

### 🔍 Testando Localmente

Para testar o projeto localmente, siga estas etapas:

1. Abra o terminal (ou prompt de comando) e execute o seguinte comando para clonar o repositório:

   `git clone https://github.com/joaocastro95/Contas-bancarias.git`

2. Navegue até a pasta do projeto e instale as dependências:

   `npm install`

3. Inicie o sistema:

   `node index.js`
   
4. Siga as instruções no terminal para criar uma conta e realizar operações bancárias.

#### 📝 Observação
Se você encontrar algum problema ou bug, consulte a seção de [Autores](#-autores) e entre em contato conosco.

## 🛠️ Estrutura do Projeto
A estrutura foi organizada para facilitar a manutenção e compreensão do código:

- **accounts/** - Pasta onde as contas são armazenadas em arquivos JSON.
    - `accountName.json` - Arquivos de contas criadas com saldo e senha.
- **node_modules/** - Pasta que contém os pacotes instalados via npm.
- **package.json** - Arquivo de configuração do projeto com dependências e scripts.
- **package-lock.json** - Arquivo gerado automaticamente para garantir a consistência das versões das dependências.
- **README.md** - Documentação do projeto.
- **index.js** - Código principal que gerencia as interações com o usuário (criação de conta, depósitos, saques).

## 🚀 Tecnologias Utilizadas

| Ferramenta       | Descrição                                         |
| ---------------- | ------------------------------------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-8CC84B?style=for-the-badge&logo=node.js&logoColor=white) | Ambiente de execução para o código JavaScript no servidor |
| ![Inquirer](https://img.shields.io/badge/Inquirer-23B8D1?style=for-the-badge&logo=npm&logoColor=white) | Biblioteca para interatividade com o usuário via prompts no terminal |
| ![Chalk](https://img.shields.io/badge/Chalk-000000?style=for-the-badge&logo=chalk&logoColor=white) | Biblioteca para estilizar textos no terminal com cores e formatação |
| ![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) | Editor de código utilizado no desenvolvimento |
| ![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white) | Sistema operacional utilizado durante o desenvolvimento |

## 📝 Autores

| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/132524175?v=4" width=115><br><sub>João Castro</sub>](https://github.com/joaocastro95) |
| --- |
