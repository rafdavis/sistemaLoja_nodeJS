import express from 'express'
const router = express.Router()
import Pedido from '../models/Pedido.js'
import Auth from '../middleware/Auth.js'

// ROTA PEDIDOS
router.get("/pedidos", Auth,(req, res) => {
    Pedido.findAll()
    .then(pedidos => {
      res.render('pedidos', {
        pedidos: pedidos
      })
    }).catch((error) => {
      console.log(error)
    })
})

// ROTA DE CADASTRO DO PEDIDO

router.post('/pedidos/new', Auth,(req,res) => {
  const numero = req.body.numero
  const valor = req.body.valor
  Pedido.create({
    numero: numero,
    valor: valor
  }).then(() => {
    res.redirect('/pedidos')
  }).catch((error) => {
    console.log(error)
  })
})

// ROTA DE EXCLUSÃO DE PEDIDOS

router.get('/pedidos/delete/:id', Auth,(req,res) => {
  const id = req.params.id
  Pedido.destroy({
    where:{
      id: id
    }
  }).then(() => {
    res.redirect('/pedidos')
  }).catch((error) => {
    console.log(error)
  })
})

// ROTA DE EDIÇÃO DE PEDIDOS
router.get('/pedidos/edit/:id', Auth,(req,res) => {
  const id = req.params.id
  Pedido.findByPk(id)
  .then((pedido) => {
    res.render('pedidoEdit', {
      pedido: pedido
    })
  }).catch((error) => {
    console.log(error)
  })
})

// ROTA DE ALTERAÇÃO DE PEDIDOS

router.post('/pedidos/update/:id', Auth,(req,res) => {
  const id = req.body.id
  const numero = req.body.numero
  const valor = req.body.valor
  Pedido.update({
    numero: numero,
    valor: valor
  },
  {where: {id: id}}
).then(() => {
  res.redirect('/pedidos')
}).catch((error) => {
  console.log(error)
})
})

export default router