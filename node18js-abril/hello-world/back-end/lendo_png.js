import path  from 'path';

/******************************************************
*  
*******************************************************/

import {local_index,mime,diretorio_base} from '../configuracoes.js';
import fs  from 'fs';

import querystring  from 'querystring';

export function lendo_png(req, res, next,complemento_endereco) {
   
   var dir = path.join(diretorio_base, complemento_endereco); 

   var previo_file = path.join(dir, req.path).replace("novas/","");  

   //console.log(previo_file.replace("novas/",""));    console.log("lendo_png  "+type)

   //previo_file="/home/julian/Desktop/julian-gamboa-ensino.github.io/node18js-abril/hello-world/Prod/pequeno-2023-02-11-hora-15-04-40.png";

   //previo_file="Prod/pequeno-2023-02-11-hora-15-04-40.png";

   console.log(previo_file);

   var decodificando_endereco_url=querystring.parse(previo_file);
   
   var file=Object.keys(decodificando_endereco_url)[0];  
   var type = mime[path.extname(file).slice(1)] || 'text/plain';

   var stream_pastas_locais = fs.createReadStream(file);   
   stream_pastas_locais.setEncoding('base64'); 

//////////////////////////////////  Open
   stream_pastas_locais.on('open', function () {
       res.set('Content-Type', type);
   });
//////////////////////////////////  Erro
   stream_pastas_locais.on('error', function (err) {
       res.statusCode=404;
       res.send("Erro função (entregando PNG) 2023, Abril "+req.path);
       //next();
   });

   
//////////////////////////////////  DATÄ
   let data = '';
   stream_pastas_locais.on('data', function(chunk) {
      data += chunk;
   });
//////////////////////////////////  END
   stream_pastas_locais.on('end', function(){
      var saida= Buffer.from(data, 'base64');
      res.end(saida);
   });

}