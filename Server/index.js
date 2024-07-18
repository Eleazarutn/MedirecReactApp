import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import fs from 'fs';
import multer from 'multer';

import { getEstados } from './JavaScript/Users/getEstados.js';
import { getMunicipios } from './JavaScript/Users/getMunicipios.js';
import { getColonias } from './JavaScript/Users/getColonias.js';
import { registerUser } from './JavaScript/Users/registerUser.js';
import { loginUser } from './JavaScript/Access/loginLogic.js';

const app = express();
app.use(cors());
app.use(express.json());

// Lee el archivo ca.pem
const caCert = fs.readFileSync('./ca.pem');

// Función para crear una conexión a la base de datos
const createDbConnection = (config) => {
    const connection = mysql.createConnection(config);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            setTimeout(() => createDbConnection(config), 2000); // Reintenta la conexión después de 2 segundos
        } else {
            console.log('Connected to the database');
        }
    });

    connection.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            createDbConnection(config); // Reconecta en caso de pérdida de conexión
        } else {
            throw err;
        }
    });
a
    return connection;
};

// Configuración de la conexión para Medirec
const dbMedirecConfig = {
    host: "mysql-178971-0.cloudclusters.net",
    port: 10055, // Puerto especificado
    user: "admin",
    password: "jf551OQT",
    database: "medirecactreact",
    ssl: {
        ca: caCert
    },
    connectTimeout: 10000 // Tiempo de espera de conexión en milisegundos (10 segundos)
};

// Configuración de la conexión para Sepomex
const dbSepomexConfig = {
    host: "mysql-178971-0.cloudclusters.net",
    port: 10055, // Puerto especificado
    user: "admin",
    password: "jf551OQT",
    database: "sepomex",
    ssl: {
        ca: caCert
    },
    connectTimeout: 10000 // Tiempo de espera de conexión en milisegundos (10 segundos)
};

const dbMedirec = createDbConnection(dbMedirecConfig);
const dbSepomex = createDbConnection(dbSepomexConfig);

getEstados(app, dbSepomex);
getMunicipios(app, dbSepomex);
getColonias(app, dbSepomex);
registerUser(app, dbMedirec);
loginUser(app, dbMedirec);

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});
