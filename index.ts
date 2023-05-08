import {MongoClient, ObjectId} from 'mongodb'
import express from 'express'

const app = express();
app.use(express.json())

// Själva serven/databasen "test" som innehåller collection "users"
const client = new MongoClient('mongodb://127.0.0.1:27017/'),
  users = client.db('test').collection('users')

// MongoDB med express:

// Hämta alla users
app.get("/", async (request, response) => {
  const result = await users.find().toArray()
  console.log(result)
  response.status(200).json(result)
})

// lägg till user
const addera = async () => {
  await users.insertOne({
    address: {
      city: 'Ankeborg',
      street: 'Storgatan 11',
      zipCode: 123456
    },
    firstName: 'Johnny',
    registered: new Date(),
    surname: 'Deppy'
  })
  console.log('Dokumentet har lagts in!')
}

app.post("/newuser", async (request, response) => {
  addera()
  response.status(200).send("Dokumentet har lagts in!")
})

app.listen(8080, () => {
  console.log('Redo på http://localhost:8080/')
})


// All nedan: Node.js med MongoDB:

// Hämta alla
// const sak = async () => {
//   const result = await users.find().toArray()
//   console.log(result)
// }
// sak()

// Hämta alla från Göteborg
// const sak = async () => {
//   const result = await users.find({ 'address.city': 'Göteborg' }).toArray()
//   console.log(result)
// }
// sak()

// Uppdatera baserat på _id
// const Uppdatera = async () => {
//   await users.updateOne( {_id: new ObjectId('6457a4307e761461e587c810')}, {$set:{'address.city': 'Göteborg' }})
//   const result = await users.find().toArray()
//   console.log(result)
// }
// Uppdatera()

// Radera document på _id
// const radera = async () => {
//   await users.deleteOne( {_id: new ObjectId('6457a4307e761461e587c810')})
//   const result = await users.find().toArray()
//   console.log(result)
// }
// radera()
