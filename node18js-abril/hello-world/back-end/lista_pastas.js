/******************************************************
 Listar aquelas pastas que estão dentro da pasta:
 
 ETIQUETAS

 

*******************************************************/
import path  from 'path';
import fs  from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//local_index,mime,pasta_FOTOS_novas,url_FOTOS_novas,

import {pasta_ETIQUETAS} from '../configuracoes.js';


export function lista_pastas(req, res, next) {    

    const completo_pasta_FOTOS = path.join(__dirname, pasta_ETIQUETAS); 
    const dirents = fs.readdirSync(completo_pasta_FOTOS, { withFileTypes: true });    
    const filesNames = dirents.filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    res.json(filesNames);
}