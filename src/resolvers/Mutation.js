const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

async function signup(parent, args, ctx, info){
  // 10 - nr que serah passado para o bcrypt para fazer duplo hash
  const password = await bcrypt.hash(args.password, 10)
  // ...args - spread operator: pega todas as propriedades de args e joga em data
  // o password eh substituido pq tem q estar criptografado
  const user = await ctx.db.mutation.createUser({data: { ...args, password }})

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' })

  return { token, user }
}

module.exports = {
  signup
}