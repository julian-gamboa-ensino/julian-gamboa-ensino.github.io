/*


As fotos classificadas (e colocadas em pastas) serão colocadas aqui
e o que esteja fora da pasta --> não será considerado


Entregando com filtro

*/

import path  from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {pasta_FOTOS_classificadas} from '../configuracoes.js';
import fs  from 'fs';
import {getFiles} from './auxiliar_getFiles.js';

export function lista_fotos_classificadas(req, res, next)
{
    const completo_pasta_FOTOS = path.join(__dirname, pasta_FOTOS_classificadas); 

    const dirents = fs.readdirSync(completo_pasta_FOTOS, { withFileTypes: true });

//A estrutura de arquivos é essencial: LEMBRAR que apenas 
//serão considerados aqueles que estejam em pastas

    const filesNames = dirents.filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

    const base_url="";

    var lista_arquivos=[];

    filesNames.forEach(element => {
        var pasta_especifica = path.join(completo_pasta_FOTOS,element); 
        lista_arquivos=lista_arquivos.concat(getFiles(pasta_especifica));        
    });

    lista_arquivos=lista_arquivos.map(
        function(endereco_local) {
            return endereco_local.replace(completo_pasta_FOTOS,base_url);
        }
    )

    const sem_PNG_TXT = lista_arquivos.filter(
        element => !element.includes(".txt")
        );

    sem_PNG_TXT.forEach(
        element => console.log("     --         "+element)  
    );


    res.json(sem_PNG_TXT);
}
