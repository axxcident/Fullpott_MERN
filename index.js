"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Tillagger middlewares till ens App.
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), 'public')));
// Själva serven/databasen "test" som innehåller collection "users"
const client = new mongodb_1.MongoClient('mongodb://127.0.0.1:27017/'), users = client.db('test').collection('users');
// MongoDB med express:
// Hämta alla users
app.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users.find().toArray();
    // console.log(result)
    response.status(200).json(result);
}));
// lägg till user
const addera = () => __awaiter(void 0, void 0, void 0, function* () {
    yield users.insertOne({
        address: {
            city: 'Ankeborg',
            street: 'Storgatan 11',
            zipCode: 123456
        },
        firstName: 'Johnny',
        registered: new Date(),
        surname: 'Deppy'
    });
    console.log('Dokumentet har lagts in!');
});
app.post("/newuser", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    addera();
    response.status(200).send("Dokumentet har lagts in!");
}));
app.listen(8080, () => {
    console.log('Redo på http://localhost:8080/');
});
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
