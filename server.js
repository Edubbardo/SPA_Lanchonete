import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import PuxarLikes from './mexerDB/PuxarLikes.js';
import PuxarDislikes from './mexerDB/PuxarDislikes.js';
import PuxarNome from './mexerDB/PuxarNome.js'
import PuxarLogo from './mexerDB/PuxarLogo.js'
import PuxarLivros from './mexerDB/PuxarLivros.js'

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/mexerDb/PuxarLikes.js', async (req, res) => {
    try {
        const likes = await PuxarLikes();
        res.json({ texto: `${likes} Likes` });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao obter likes' });
    }
});

app.get('/mexerDb/PuxarDislikes.js', async (req, res) => {
    try {
        const dislikes = await PuxarDislikes();
        res.json({ texto: `${dislikes} Dislikes` });
    } catch (erro) {
        console.error('Erro ao obter dislikes:', erro);
        res.status(500).json({ erro: 'Erro ao obter dislikes' });
    }
});

app.get('/mexerDb/PuxarNome.js', async (req,res) => {
  try{
      const nome = await PuxarNome()
      res.json({texto: nome})
  }catch(erro){
      console.error('Erro ao obter o Nome da empresa')
      res.status(500).json({erro: 'Erro ao obter Nome da Empresa'})
  }
})

app.get('/mexerDb/PuxarLogo.js', async (req, res) => {
  try{
    const logo = await PuxarLogo()
    res.json({texto: logo})
  }catch(erro){
    console.error('Erro ao obter o URL da imagem')
    res.status(500).json({erro: 'Erro ao obter URL da imagem'})
  }
})

app.get('/mexerDb/PuxarLivros.js', async (req, res) => {
  try{
    const livros = await PuxarLivros()
    res.json({livros})
  }catch(erro){
    console.error('Erro ao obter os livros')
    res.status(500).json({erro: 'Erro ao obter os livros'})
  }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});