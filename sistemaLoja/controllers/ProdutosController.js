import express from 'express'
import Produto from '../models/Produto.js'
import Auth from '../middleware/Auth.js'
const router = express.Router()

// ROTA DE PRODUTOS
router.get("/produtos", Auth,(req, res) => {
    Produto.findAll()
    .then(produtos => {
      res.render('produtos', {
        produtos: produtos
      })
    }).catch((error) => {
      console.log(error)
    })
})

// ROTA DE CADASTRO DE PRODUTOS

router.post('/produtos/new', Auth,(req,res) => {
  const nome = req.body.nome
  const preco = req.body.preco
  const categoria = req.body.categoria
  Produto.create({
    nome: nome,
    preco: preco,
    categoria: categoria
  }).then(() => {
    res.redirect('/produtos')
  }).catch((error) => {
    console.log(error)
  })
})

// ROTA DE EXCLUSÃO DE PRODUTOS

router.get('/produtos/delete/:id', Auth,(req,res) => {
  const id = req.params.id
  Produto.destroy({
    where:{
      id: id
    }
  }).then(() => {
    res.redirect('/produtos')
  }).catch((error) => {
    console.log(error)
  })
})

// ROTA DE EDIÇÃO DE PRODUTOS
router.get('/produtos/edit/:id', Auth,(req,res) => {
  const id = req.params.id
  Produto.findByPk(id)
  .then((produto) => {
    res.render('produtoEdit', {
      produto: produto
    })
  }).catch((error) => {
    console.log(error)
  })
})

// ROTA DE ALTERAÇÃO DE PRODUTOS
router.post('/produtos/update/:id', Auth,(req,res) => {
  const id = req.body.id
  const nome = req.body.nome
  const preco = req.body.preco
  const categoria = req.body.categoria
  Produto.update({
    nome: nome,
    preco: preco,
    categoria: categoria
  },
  {where: {id: id}}
).then(() => {
  res.redirect('/produtos')
}).catch((error) =>{
  console.log(error)
})
})


export default router