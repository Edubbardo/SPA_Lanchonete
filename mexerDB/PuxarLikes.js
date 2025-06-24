import ConectarDB from '../conectarBanco.js';

export default async function PuxarLikes() {
    try {
        const db = await ConectarDB();
        const resultado = await db.get('SELECT COUNT(*) AS totalLikes FROM interacoes WHERE tipo = ?', ['like']);
        const Likes = resultado.totalLikes
        return Likes
    } catch (erro) {
        console.error('Erro ao contar likes:', erro);
        throw erro;
    }
}
