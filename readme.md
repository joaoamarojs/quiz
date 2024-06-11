### README.md

# Quiz com Express Generator e Socket.io

Este projeto é uma aplicação de quiz construída usando o Express Generator e Socket.io para comunicação em tempo real. Ele permite que múltiplos usuários participem de um quiz e acompanha suas pontuações em tempo real.

## Estrutura do Projeto

```plaintext
quiz/
│
├── bin/
│   └── www                     # Arquivo de inicialização do servidor
├── public/
│   ├── javascripts/
│   │   └── index.js           # Arquivo JavaScript para a tela principal
│   ├── stylesheets/
│   │   └── style.css          # Arquivo de estilização para a tela principal
├── routes/
│   └── index.js               # Rota principal
├── services/
│   ├── perguntas.js           # Módulo de perguntas
│   └── users.js               # Módulo de usuários
├── views/
│   ├── error.ejs
│   └── index.ejs
├── perguntas.json             # Arquivo JSON com perguntas do quiz
├── app.js                     # Configuração principal do Express
├── package.json               # Configurações do npm
└── README.md                  # Documentação do projeto
```

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/quiz.git
    cd quiz
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie o servidor:
    ```sh
    npm start
    ```

O servidor estará rodando em `http://localhost:3000`.

## Estrutura de Arquivos

### `bin/www`

Arquivo de inicialização do servidor que configura o servidor HTTP e integra o Socket.io.

### `public/javascripts/index.js`

Arquivo JavaScript responsável pela interação do cliente com o servidor via Socket.io. 

### `public/stylesheets/style.css`

Arquivo de estilos para a página principal do quiz.

### `routes/index.js`

Define a rota principal da aplicação.

### `services/perguntas.js`

Módulo que gerencia as perguntas do quiz, incluindo a lógica para selecionar perguntas aleatórias e evitar repetições.

### `services/users.js`

Módulo que gerencia os usuários do quiz, incluindo o registro e a pontuação dos usuários.

### `views/index.ejs`

Página principal da aplicação, renderizada pelo Express.

### `app.js`

Configuração principal do Express, incluindo middleware e configurações de rota.

### `perguntas.json`

Arquivo JSON contendo as perguntas e respostas do quiz.

## Funcionalidades

- **Registro de Usuários**: Permite que novos usuários se registrem e comecem o quiz.
- **Quiz em Tempo Real**: Utiliza Socket.io para comunicação em tempo real entre o cliente e o servidor.
- **Perguntas Aleatórias**: Seleciona perguntas aleatórias evitando repetições.
- **Pontuação e Ranking**: Acompanha a pontuação dos usuários e exibe um ranking em tempo real.

## Exemplo de Uso

### Registrando um Novo Usuário

1. Ao acessar a aplicação, clique no botão "Jogar".
2. Insira seu nome no popup que aparecerá.
3. A primeira pergunta será exibida após o registro.

### Respondendo Perguntas

- Escolha uma resposta para a pergunta exibida.
- Sua resposta será enviada para o servidor e o resultado será exibido.
- Se correta, você ganhará um ponto e uma nova pergunta será exibida até que 10 perguntas tenham sido respondidas.

### Finalizando o Quiz

- Ao completar 10 perguntas, sua pontuação final será exibida e o ranking será atualizado.

## Tecnologias Utilizadas

- **Express.js**: Framework para construir a aplicação web.
- **Socket.io**: Biblioteca para comunicação em tempo real.
- **EJS**: Template engine para renderização de páginas HTML.
- **Bootstrap**: Framework CSS para estilização.