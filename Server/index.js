import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import multer from 'multer';

import { getEstados } from './JavaScript/Users/getEstados.js';
import { getMunicipios } from './JavaScript/Users/getMunicipios.js';
import { getColonias } from './JavaScript/Users/getColonias.js';
import { registerUser } from './JavaScript/Users/registerUser.js';
import { loginUser } from './JavaScript/Access/loginLogic.js';



const app = express();
app.use(cors());
app.use(express.json());

const dbMedirec = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "medirecactreact"
});

const dbSepomex = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sepomex"
});

getEstados(app,dbSepomex);
getMunicipios(app,dbSepomex);
getColonias(app,dbSepomex);
registerUser(app,dbMedirec);
loginUser(app,dbMedirec);








app.listen(3001, ()=>{
    console.log("Corriendo en el puerto 3001");
})
