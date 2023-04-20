import {mime, local_index} from '../configuracoes.js';

import path  from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs  from 'fs';

import querystring  from 'querystring';

/******************************************************

*******************************************************/

export function entregando_index(req, res, next) {

       
       var dir = path.join(__dirname, local_index); 
       
       //var previo_file = path.join(dir, req.path);   
       var previo_file = path.join(dir, req.path.replace(/\/$/, '/index.html'));   
       
       var decodificando_endereco_url=querystring.parse(previo_file);
   
       var file=Object.keys(decodificando_endereco_url)[0];  

console.log(req.path+"     *************************************************   req.path  "+previo_file)
   
       var type = mime[path.extname(file).slice(1)] || 'text/plain';   
       
   //Envio do arquivo por PIPE
       var stream_pastas_locais = fs.createReadStream(file);
   
       stream_pastas_locais.on('open', function () {
           res.set('Content-Type', type);
           stream_pastas_locais.pipe(res);
       });
   
   //Em caso de ERRO deve-se liberar para o seguinte:
       stream_pastas_locais.on('error', function (err) {
           res.send("Erro função (entregando_index) "+req.path);
           next();
       });
   }
