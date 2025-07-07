import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import PuxarLikes from './mexerDB/PuxarLikes.js';
import PuxarDislikes from './mexerDB/PuxarDislikes.js';
import PuxarPublicacoes from './mexerDB/PuxarPublicacoes.js'
import FazerLogin from './mexerDB/FazerLogin.js'


const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

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

app.get('/mexerDb/PuxarPublicacoes.js', async (req, res) => {
  try{
    const publicacoes = await PuxarPublicacoes()
    res.json({publicacoes})
  }catch(erro){
    console.error('Erro ao obter as publicações')
    res.status(500).json({erro: 'Erro ao obter as publicações'})
  }
})

app.post('/mexerDb/FazerLogin.js', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await FazerLogin(email, senha);
    if (usuario) {
      res.json({ sucesso: true, usuario });
    } else {
      res.status(401).json({ sucesso: false, mensagem: 'E-mail ou senha incorretos' });
    }
  } catch (erro) {
    res.status(500).json({ erro: 'Erro no login' });
  }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});