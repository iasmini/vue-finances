const { getUserId } = require('./../utils')

function accounts(parent, args, ctx, info){
  const userId = getUserId(ctx)
  return ctx.db.query.accounts({
    where: {
      OR: [
        {user: {id: userId}},
        {user: null}
      ]
    },
    orderBy: 'name_ASC'
  }, info)
}

function categories(parent, {kind}, ctx, info){
  const userId = getUserId(ctx)
  let AND = [
    {
      OR: [
        {user: {id: userId}},
        {user: null}
      ]
    }
    ]

  // se filtra por kind, adiciona kind nos parametros
  AND = !kind ? AND : [...AND, {kind: kind}]

  return ctx.db.query.categories({
    where: {AND},
    orderBy: 'name_ASC'
  }, info)
}

function user(parent, args, ctx, info){
  const userId = getUserId(ctx)
  return ctx.db.query.user({where: {id: userId}}, info)
}

module.exports = {
  accounts,
  categories,
  user }