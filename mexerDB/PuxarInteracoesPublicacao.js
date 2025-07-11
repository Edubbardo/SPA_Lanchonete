import ConectarDB from '../conectarBanco.js';

export default async function PuxarInteracoesPublicacao(id_publicacao, id_usuario) {
    const db = await ConectarDB();

    const likes = await db.get(
        `SELECT COUNT(*) as total FROM interacoes WHERE publicacao_id = ? AND tipo = 'like'`, 
        [id_publicacao]
    );

    const dislikes = await db.get(
        `SELECT COUNT(*) as total FROM interacoes WHERE publicacao_id = ? AND tipo = 'dislike'`, 
        [id_publicacao]
    );

    let interacao_usuario = null;

    if (id_usuario) {
        const resultado = await db.get(
            `SELECT tipo as interacao_usuario FROM interacoes WHERE publicacao_id = ? AND usuario_id = ?`, 
            [id_publicacao, id_usuario]
        );
        if (resultado) {
            interacao_usuario = resultado.interacao_usuario;
        }
    }

    return { 
        likes: likes.total, 
        dislikes: dislikes.total, 
        interacao_usuario 
    };
}
