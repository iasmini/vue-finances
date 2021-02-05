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

function user(parent, args, ctx, info){
  const userId = getUserId(ctx)
  return ctx.db.query.user({where: {id: userId}}, info)
}

module.exports = { accounts, user }