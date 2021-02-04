const jwt = require('jsonwebtoken')

function getUserId(context){
  // "Authorization": "Bearer <token_jwt>"
  const authorization = context.request.get('Authorization')

  if (authorization){
    const token = authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    return userId
  }

  throw new Error('Não autenticado.')
}

module.exports = {getUserId}