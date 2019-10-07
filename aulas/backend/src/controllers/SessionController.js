// index, show, store, update, destroy

// index retorna uma listagem de sessoes

// show retorna uma unica sessao

// store cria uma sessao

// update alterar uma sessao

// destroy e para excluir uma sessao

const User = require('../models/User')

module.exports= {
  async  store(req, res){
  const {email} = req.body;

  let user = await User.findOne({email})
                  // FindOne buscamos dentro do user a propriedade email.

  //Abaixo é para validar se o cara existe.
  if(!user){
   user = await User.create({email});
  }

  return res.json(user);

  }
};
