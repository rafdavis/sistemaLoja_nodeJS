const express = require("express"); 
const app = express();

app.set("view engine", "ejs");

app.use(express.static('public'))

// CRIANDO A ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.render("index");
});

// ROTA DE CLIENTES
app.get("/clientes", (req, res) => {
  const clientes = 
 [{nome: "Raul Gabriel", foto: "imgs/avatar.png", cpf: "213.142.353.47", endereco: "Rua Reinaldo Messias Nº 94"},
  {nome: "Gustavo Vergilio", foto: "imgs/avatar.png", cpf: "328.973.982.74", endereco: "Rua Mirian Camargo Nº 78"},
  {nome: "Guilherme Roberto", foto: "imgs/avatar.png", cpf: "674.372.892.13", endereco: "Rua Rodolfo Marilhano Nº 45"},
  {nome: "Rafael Toloi", foto: "imgs/avatar.png", cpf: "893.765.712.04", endereco: "Rua Jair de Pontes Nº 26"},]
  res.render("clientes", {
    clientes: clientes,
  });
});

// ROTA DE PRODUTOS
app.get("/produtos", (req, res) => {
  const produto = 
   [{nome: "Celular ", foto: "imgs/celular.png", preco: '1300,00', categoria: "Celulares e Dispositivos"},
    {nome: "Tablet  ", foto: "imgs/tablet.png", preco: 'R$ 950,00', categoria: "Celulares e Dispositivos"},
    {nome: "Notebook  ", foto: "imgs/notebook.png", preco: 'R$ 2500,00', categoria: "Celulares e Dispositivos"},
    {nome: "Computador  ", foto: "imgs/computador.png", preco: ' R$ 5000,00', categoria: "Celulares e Dispositivos"},];
  res.render("produtos", {
    produto: produto, 
  });
});

// ROTA PEDIDOS
app.get("/pedidos", (req, res) => {
  const pedidos = 
   [{numero: "1", nome: "David Lucas ", foto: "imgs/avatar.png", preco: '1300,00', cpf: "364.324.254.30", produto: "Celular", categoria: "Celulares e Dispositivos"},
    {numero: "2", nome: "Matheus Silva", foto: "imgs/avatar.png", preco: 'R$ 950,00', cpf: "214.564.213.54", produto: "Tablet", categoria: "Celulares e Dispositivos"},
    {numero: "3", nome: "Otavio Miranda", foto: "imgs/avatar.png", preco: 'R$ 2500,00', cpf: "213.345.654.23", produto: "Notebook", categoria: "Celulares e Dispositivos"},
    {numero: "4", nome: "Elton Tauan", foto: "imgs/avatar.png", preco: ' R$ 5000,00', cpf: '123.456.234.12', produto: "Computador", categoria: "Celulares e Dispositivos"},];
  res.render("pedidos", {
    pedidos: pedidos
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
