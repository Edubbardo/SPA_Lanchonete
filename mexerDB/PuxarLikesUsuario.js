import ConectarDB from '../conectarBanco.js';

export default async function PuxarLikesUsuario(id) {
    try {
        const db = await ConectarDB();
        const resultado = await db.get(
            'SELECT COUNT(*) AS totalLikesUsuario FROM interacoes WHERE tipo = ? AND usuario_id = ?',['like', id]);
        return resultado.totalLikesUsuario;
    } catch (erro) {
        console.error('Erro ao contar dislikesaa:', erro);
        throw erro;
    }
}
