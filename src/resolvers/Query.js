const moment = require('moment')
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

function entries(parent, {month, kind, accountsIds, categoriesIds}, ctx, info){
  const userId = getUserId(ctx)
  let AND = [{user: {id: userId}}]

  // se filtra por kind, adiciona kind nos parametros
  if (kind){AND = [...AND, {kind: kind}]}

  if (accountsIds && accountsIds.length > 0){
    AND = [...AND,
      {OR: accountsIds.map(id => ({account: {id: id}}))},
      ]
  }

  if (categoriesIds && categoriesIds.length > 0){
    AND = [...AND,
      {OR: categoriesIds.map(id => ({category: {id: id}}))}
      ]
  }

  if (month){
    const date = moment(month, 'MM-YYYY')
    const startDate = date.startOf('month').toISOString()
    const endDate = date.endOf('month').toISOString()
    AND = [...AND,
      {due_date_gte: startDate},
      {due_date_lte: endDate},
    ]
  }

  return ctx.db.query.entries({
    where: {AND: AND},
    order_by: 'due_date_ASC'
  }, info)
}

function user(parent, args, ctx, info){
  const userId = getUserId(ctx)
  return ctx.db.query.user({where: {id: userId}}, info)
}

module.exports = {
  accounts,
  categories,
  entries,
  user }