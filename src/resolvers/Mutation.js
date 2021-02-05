const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { getUserId } = require('./../utils')

const JWT_SECRET = process.env.JWT_SECRET

function createAccount(parent, {name}, ctx, info){
  const userId = getUserId(ctx)
  return ctx.db.mutation.createAccount({
    data: {
      name,
      user: {
        connect: {id: userId}
      }
    }
  }, info)
}

function createCategory(parent, {name, kind}, ctx, info){
  const userId = getUserId(ctx)
  return ctx.db.mutation.createCategory({
    data: {
      name,
      kind,
      user: {
        connect: {id: userId}
      }
    }
  }, info)
}

async function signin(parent, {email, password}, ctx, info){
  const user = await ctx.db.query.user({ where: {email} })
  if (!user){
    throw new Error(`Não foi encontrado usuário para o e-mail ${email}.`)
  }

  // verifica se a senha estah valida
  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword){
    throw new Error('Senha inválida.')
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' })

  return { token, user }
}

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
  createAccount,
  createCategory,
  signin,
  signup}