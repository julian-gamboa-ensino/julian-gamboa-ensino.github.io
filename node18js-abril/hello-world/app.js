/*
index

*/

import {entregando_index} from './back-end/entregando_index.js';

import {entregando_complementos_index} from './back-end/entregando_complementos_index.js';

import {lista_fotos_classificadas} from './back-end/lista_fotos_classificadas.js'

import {entregando_nova_imagem} from './back-end/entregando_nova_imagem.js'

import {lista_pastas as listar_pastas_classificadas} from './back-end/lista_pastas.js';

app.get("/lista_pastas", listar_pastas_classificadas);


////////////////////////////////////////////////////////
import serverless from 'serverless-http';

import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Index
app.get('/index.html', entregando_index);


//classificadas
app.get("/*/classificadas", lista_fotos_classificadas);
app.get("/classificadas", lista_fotos_classificadas);

//jpg
app.get("/classificadas/*/*.jpg", entregando_nova_imagem);

//png
app.get("/*/classificadas/*/*.png", entregando_nova_imagem);
app.get("/classificadas/*/*.png", entregando_nova_imagem);

//Complemento (Index) 
app.get("/*/*.*", entregando_complementos_index); 
app.get("/*.*", entregando_complementos_index); 


export const lambdaHandler = serverless(app, {
    binary: ['image/png', 'image/gif','image/jpg']
  });

