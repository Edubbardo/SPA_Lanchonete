import ConectarDB from '../conectarBanco.js';

export default async function PuxarDislikesUsuario(id) {
    try {
        const db = await ConectarDB();
        const resultado = await db.get(
            'SELECT COUNT(*) AS totalDislikesUsuario FROM interacoes WHERE tipo = ? AND usuario_id = ?',['dislike', id]);
        return resultado.totalDislikesUsuario;
    } catch (erro) {
        console.error('Erro ao contar dislikesaa:', erro);
        throw erro;
    }
}
