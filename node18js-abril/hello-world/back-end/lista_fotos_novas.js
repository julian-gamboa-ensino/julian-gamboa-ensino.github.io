/*


As fotos classificadas (e colocadas em pastas) serão colocadas aqui
e o que esteja fora da pasta --> não será considerado


Entregando com filtro

*/

import path  from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {pasta_FOTOS_novas,stage} from '../configuracoes.js';
import fs  from 'fs';
import {getFiles} from './auxiliar_getFiles.js';

export function lista_fotos_novas(req, res, next)
{
    const completo_pasta_FOTOS = path.join(__dirname, pasta_FOTOS_novas); 

    console.log(completo_pasta_FOTOS);

    const dirents = fs.readdirSync(completo_pasta_FOTOS, { withFileTypes: true });

/*
A estrutura de arquivos é essencial: LEMBRAR que apenas 
serão considerados aqueles que 
NÂO estejam em pastas
*/
    const filesNames = dirents.filter(dirent => 
        !dirent.isDirectory()) // apenas considerando Não Arquivos
    .map(dirent => dirent.name);

    
    //const base_url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const base_url = `${req.protocol}://${req.get('host')}/${stage}${req.originalUrl}`;

    //console.log(req.get('host'));

     var lista_arquivos = filesNames.map(
        function(val){
            return base_url+"/"+val;
        }
     );
       
    res.json(lista_arquivos);
}
