const { prisma } = require('./generated/prisma-client')

async function main(){
  await prisma.createUser({
    name: 'Iasmini Gomes',
    email: 'iasmini.gomes@gmail.com',
    password: '1'
  })

  const users = await prisma.users()
  console.log(users)
}

main().catch(e => console.error(e))
