// // const express = require('express');
// // const cors = require('cors');
// // const fs = require("fs");
//
// import express from 'express';
// import cors from 'cors';
// import fs from 'fs';
//
// const app = express();
// const PORT = process.env.PORT || 8080;
//
// // let data_json = require('./databases/data.json');
//
// app.use(cors());
// app.use(express.json());
//
// app.listen(PORT, () => {
//     console.log('Сервер запущен на порту - ' + PORT);
// });
//
// app.get('/papo', (req, res) => {
//     res.json(data_json);
// });
//
//
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// })
//
// module.exports = data_json = JSON.stringify(fs.readFileSync('databases/data.json', 'utf8'), null, 4);
//
// // require('./rotes/index')(app);
//
// app.listen(PORT, () => {
//     console.log('Work!' + PORT);
// });
//
// import mongoose from "mongoose";
// import { Schema } from "mongoose";
// // const mongoose = require('mongoose');
// // const { Schema } = require('mongoose');
//
// const uri = "mongodb://admin:admin@127.0.0.1:27014/docker?authSource=admin"
// mongoose.set('strictQuery', false);
//
// const userScheme = new Schema ({
//     name: String,
//     password: String
// });
// const User = mongoose.model("User", userScheme);
//
// const mongoDB = async () => {
//     await mongoose.connect(uri)
//         .then(res => { console.log('MongoDB: Подключено успешно - Порт: 27014') })
//         .catch(res => { console.log('MongoDB: Не подлючено') });
//
//     // await insertUser();
//     // await deleteUser();
//     // await updateUser();
//     await findAll();
// }
//
// const findAll = async () => {
//     const users = await User.find({});
//     console.log(users)
// }
// const insertUser = async () => {
//     await User.create({ name: "dan-3", password: "dan-3-pwd" });
// }
// const deleteUser = async () => {
//     await User.deleteOne({ name: "dan-3" });
// }
// const updateUser = async () => {
//     await User.updateOne({ name: "dan-3" }, { password: "dan-3-pwd" })
// }
//
// mongoDB();
const app = require('./app');

const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log('Сервер был запущен на порту - ' + port + '\n');
})