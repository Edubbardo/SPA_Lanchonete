import ConectarDB from '../conectarBanco.js';

export default async function PuxarDislikes() {
    try {
        const db = await ConectarDB();
        const resultado = await db.get(
            'SELECT COUNT(*) AS totalDislikes FROM interacoes WHERE tipo = ?',
            ['dislike']
        );
        return resultado.totalDislikes;
    } catch (erro) {
        console.error('Erro ao contar dislikes:', erro);
        throw erro;
    }
}
