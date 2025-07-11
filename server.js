import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import PuxarLikes from './mexerDB/PuxarLikes.js';
import PuxarDislikes from './mexerDB/PuxarDislikes.js';
import PuxarPublicacoes from './mexerDB/PuxarPublicacoes.js'
import FazerLogin from './mexerDB/FazerLogin.js'
import PuxarDislikesUsuario from './mexerDB/PuxarDislikesUsuario.js'
import PuxarLikesUsuario from './mexerDB/PuxarLikesUsuario.js'
import DarLike from './mexerDB/DarLike.js';
import DarDislike from './mexerDB/DarDislike.js';
import PuxarInteracoesPublicacao from './mexerDB/PuxarInteracoesPublicacao.js';


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

app.post('/mexerDb/PuxarDislikesUsuario.js', async (req, res) => {
  const {id} = req.body
    try {
        const dislikesUsuario = await PuxarDislikesUsuario(id);
        res.json({ texto: `${dislikesUsuario} Dislikes` });
    } catch (erro) {
        console.error('Erro ao obter dislikes:', erro);
        res.status(500).json({ erro: 'Erro ao obter dislikes' });
    }
});

app.post('/mexerDb/PuxarLikesUsuario.js', async (req, res) => {
  const {id} = req.body
    try {
        const likesUsuario = await PuxarLikesUsuario(id);
        res.json({ texto: `${likesUsuario} Likes` });
    } catch (erro) {
        console.error('Erro ao obter likes:', erro);
        res.status(500).json({ erro: 'Erro ao obter likes' });
    }
});

app.post('/mexerDb/DarLike.js', async (req, res) => {
  const { id_usuario, id_publicacao } = req.body;
  const resultado = await DarLike({ id_usuario, id_publicacao });
  res.json(resultado);
});

app.post('/mexerDb/DarDislike.js', async (req, res) => {
  const { id_usuario, id_publicacao } = req.body;
  const resultado = await DarDislike({ id_usuario, id_publicacao });
  res.json(resultado);
});

app.post('/mexerDb/PuxarInteracoesPublicacao.js', async (req, res) => {
  const { id_publicacao, id_usuario } = req.body;

  try {
    const interacoes = await PuxarInteracoesPublicacao(id_publicacao, id_usuario);
    res.json(interacoes);
  } catch (erro) {
    console.error('Erro ao obter interações do post:', erro);
    res.status(500).json({ erro: 'Erro ao buscar interações do post' });
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