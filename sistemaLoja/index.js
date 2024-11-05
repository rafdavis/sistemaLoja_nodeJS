import express from "express"
const app = express();
import connection from "./config/sequelize-config.js"
import session from 'express-session'

app.use(session({
  secret: 'lojasecret', 
  cookie: {maxAge: 3600000},
  saveUninitialized: false,
  resave: false
}))

import Auth from './middleware/Auth.js'

import flash from "express-flash"

app.use(flash())

connection.authenticate()
.then(() => {
  console.log('Conexão com o Banco de Dados feita com sucesso!')
}).catch((error) => {
  console.log(error)
})

// Permite receber dados do formulário
app.use(express.urlencoded({extented: false}))
app.use(express.json())

connection.query('CREATE DATABASE IF NOT EXISTS loja;')
.then(() => {
  console.log('Banco de Dados está criado')
}).catch((error) => {
  console.log(error)
})

import ClientesController from "./controllers/ClientesController.js"
import PedidosController from "./controllers/PedidosController.js"
import ProdutosController from "./controllers/ProdutosController.js"
import UsersController from './controllers/UsersController.js'

app.use("/", ClientesController)
app.use("/", PedidosController)
app.use("/", ProdutosController)
app.use("/", UsersController)

app.set("view engine", "ejs");

app.use(express.static('public'))

// CRIANDO A ROTA PRINCIPAL
app.get("/", Auth,(req, res) => {
  res.render("index", {
    messages: req.flash()
  });
});


// Iniciando o servidor na porta 8080
const port = 8080;
app.listen(port, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
  }
});