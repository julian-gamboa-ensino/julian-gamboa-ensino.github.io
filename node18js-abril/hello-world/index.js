import {lista_fotos_classificadas} from './back-end/lista_fotos_classificadas.js'


import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import {entregando_index} from './back-end/entregando_index.js';

import {entregando_complementos_index} from './back-end/entregando_complementos_index.js';

import {entregando_nova_imagem} from './back-end/entregando_nova_imagem.js'

import {lista_pastas as listar_pastas_classificadas} from './back-end/lista_pastas.js';


app.get("/lista_pastas", listar_pastas_classificadas);



app.listen(3001)