import ConectarDB from '../conectarBanco.js';

export default async function FazerLogin(email, senha) {
  try {
    const db = await ConectarDB();
    const resultado = await db.get('SELECT id, email,foto_perfil,nome FROM usuarios WHERE email = ? AND senha_hash = ?', [email, senha]);
    return resultado;
  } catch (erro) {
    console.error('Erro no login:', erro);
    throw erro;
  }
}