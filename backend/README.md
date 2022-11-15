# Setup do Projeto

## Variáveis de Ambiente

O Backend utiliza variáveis de ambiente para acessar as credenciais do banco de dados e da porta
principal do servidor. Então, antes de executar o projeto, crie um arquivo `.env` com as seguintes
variáveis

- `DATABASE_TYPE`: nome do banco de dados que quer se conectar
- `DATABASE_HOST`: de onde você irá de conectar ao banco, por exemplo, **localhost**
- `DATABASE_PORT`: porta do banco de dados
- `DATABASE_USERNAME`: nome de usuário do banco de dados
- `DATABASE_PASSWORD`: senha do usuário do banco de dados
- `DATABASE_NAME`: nome do banco de dados
- `SERVER_PORT`: porta em que o servidor principal executará

## Instalações

Após criar o arquivo `.env`, instale os pacotes com o comando

```
$ yarn
```

## Execução do projeto

Para executar o projeto, execute o comando

```
yarn dev
```
