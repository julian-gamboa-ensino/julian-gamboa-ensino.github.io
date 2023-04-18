import path  from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {local_index,mime} from '../configuracoes.js';
import fs  from 'fs';


///////////////////////// Funções Auxiliares /////////////////////////////

// Auxiliares da procura das imagens

export function getFiles (dir, files_){
   files_ = files_ || [];
   var files = fs.readdirSync(dir);
   for (var i in files){
       var name = dir + '/' + files[i];
       if (fs.statSync(name).isDirectory()){
           getFiles(name, files_);
       } else {
           files_.push(name);
       }
   }
   return files_;
}
