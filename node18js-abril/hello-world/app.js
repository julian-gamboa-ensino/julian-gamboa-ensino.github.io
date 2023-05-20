import serverless from 'serverless-http';

import express from 'express';

/**************************************
classificadas 

**************************************/

import {lista_fotos_novas} from './back-end/lista_fotos_novas.js'

import {stage} from './configuracoes.js';

import {atendendo_componente} from './back-end/atendendo_componente.js'

import {entregando_index} from './back-end/entregando_index.js';

import {entregando_complementos_index} from './back-end/entregando_complementos_index.js';

import {lista_fotos_classificadas} from './back-end/lista_fotos_classificadas.js'

import {entregando_nova_imagem} from './back-end/entregando_nova_imagem.js'

import {lista_pastas as listar_pastas_classificadas} from './back-end/lista_pastas.js';

import cors from 'cors';

////////////////////////////////////////////////////////

const app = express();

app.use(cors()); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//novas
app.get('/'+stage+'/novas', lista_fotos_novas);
app.get("/novas", lista_fotos_novas);

//PNG
app.get('/'+stage+'/novas/*.png', entregando_nova_imagem); 
app.get("/novas/*.png", entregando_nova_imagem); 
//JPG
app.get('/'+stage+'/novas/*.jpg', entregando_nova_imagem); 
app.get("/novas/*.jpg", entregando_nova_imagem); 

///////////////////////////

app.get("/lista_pastas", listar_pastas_classificadas);

//Index
app.get('/'+stage+'/', entregando_index);
app.get('/', entregando_index);


//classificadas
app.get('/'+stage+'/classificadas', lista_fotos_classificadas);
app.get("/classificadas", lista_fotos_classificadas);

//jpg
app.get('/'+stage+'/classificadas/*/*.jpg', entregando_nova_imagem);
app.get("/classificadas/*/*.jpg", entregando_nova_imagem);

//png
app.get('/'+stage+'/classificadas/*/*.png', entregando_nova_imagem);
app.get("/classificadas/*/*.png", entregando_nova_imagem);

//Complemento (Index) 
app.get('/'+stage+'/*.*', entregando_complementos_index); 
app.get("/*.*", entregando_complementos_index); 


//Componente
app.get('/'+stage+'/novo/novo', atendendo_componente);
app.get("/novo/novo", atendendo_componente);


export const lambdaHandler = serverless(app, {
    binary: ['image/png', 'image/gif','image/jpg']
  });

  //app.listen(3001);