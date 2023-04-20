import path  from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {local_index,mime} from '../configuracoes.js';
import fs  from 'fs';


export function atendendo_componente(req, res, next) {    
   
   var dir = path.join(__dirname, local_index);         

   var file=dir+"/index.html";

//console.log("etiquetas  entregando_index  "+file);

   var type = mime[path.extname(file).slice(1)] || 'text/plain';
   
//Envio do arquivo por PIPE
   var stream_pastas_locais = fs.createReadStream(file);

   stream_pastas_locais.on('open', function () {
       res.set('Content-Type', type);
       stream_pastas_locais.pipe(res);
   });

//Em caso de ERRO deve-se liberar para o seguinte:
   stream_pastas_locais.on('error', function (err) {
       res.send("Erro função (atendendo_componente) "+req.path);
       next();
   });
}
