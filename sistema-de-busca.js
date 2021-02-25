class e621 {
  static baixar (searchTerms) {
const fs = require("fs");
const querystring = require('querystring');
const fetch = require('node-fetch');
const opts = {method: 'GET',headers: {'User-Agent': 'crosdid/1.0',},};
const dlPath = __dirname + "/e621";
if (!fs.existsSync(dlPath)) {
    fs.mkdirSync(dlPath);
}
const query = querystring.stringify({tags: searchTerms,}).replace(/%20/gu, '+');
	fetch(`https://e621.net/posts.json?${query}`, opts).then((res) => res.json()).then((json) => {
 const { posts } = json;
 if (!posts.length) {
  return console.log(`nenhum resultado para: \`${searchTerms}\`.`);}
 const result = posts[Math.floor(Math.random() * posts.length)];

let filename = result.id;
let fileTIPO = result.file.ext;
const arquivo = result.file.url;
const artista = result.tags.artist;

if (arquivo) {
  if (arquivo.endsWith('.webm') || arquivo.endsWith('.swf')) {
   return console.log('\x1b[31m',`https://e621.net/post/show/${filename} \n \narquivos em (webm,swf) não podem ser baixadas!`)
  }
 }


async function download() {
  const response = await fetch(arquivo);
const buffer = await response.buffer()
fs.writeFileSync(`${dlPath}/${artista}-${filename}.${fileTIPO}`,buffer)
 }
download();


const byteLength = JSON.stringify(result).length;

console.log('\x1b[32m',`o download para ${filename} foi concluido!\n\ntamanho do arquivo: ${byteLength}-bytes\nartista: ${artista}\nID: ${filename}\nlink: ${arquivo}`)

}).catch((err) => {console.error(`DEU ERRO! \n devido a:${err}`);
});
  }
  static pastainfo() {
const fs = require("fs");

//caso nao exiata a pasta ./e621 para a busca, esse evento ira criar
const dlPath = __dirname + "/e621";
if (!fs.existsSync(dlPath)) {
    fs.mkdirSync(dlPath);
}

fs.readdir('./e621', async function(err, files){
	if(err) console.log(err)
	var jsf = files.filter(f => f.split(".").pop() === "png" || "jpeg")
if(jsf <= 0) return console.log("a pasta./e621 não existe, ou está sem imagens")
const byteh = JSON.stringify(jsf).length;
console.log(`total de imagens: ${jsf.length}\ntotal de bytes: ${byteh}-bytes`)
})
  }
}
module.exports = e621;