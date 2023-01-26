import { faker } from '@faker-js/faker'
import fs from 'fs'

const filename = './input-data.csv'
const stream = fs.createWriteStream(filename)
stream.write('id,user,email,avatar,pass,birth,createdAt\n', handler)

for (let i = 0; i < 1_000_000_000; i++) {
  const isDraining = stream.write(generateRow(), handler)
  if (!isDraining) {
    console.log(`waiting for drain on row ${i}`)
    await new Promise(res => stream.on('drain', res))
  }

  if (i % 1_000_000) console.log(`finished ${i} rows`)
}

console.log('finished!')

function generateRow() {
  const r = [
    faker.datatype.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.image.avatar(),
    faker.internet.password(),
    faker.date.birthdate(),
    faker.date.past(),
  ]

  return r.join(',') + '\n'
}

function handler(err) {
  if (err) throw err


}
