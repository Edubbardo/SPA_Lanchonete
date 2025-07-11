import ConectarDB from '../conectarBanco.js';

export default async function DarDislike({id_usuario,id_publicacao}) {
    try {
        const db = await ConectarDB();
        await db.run(`DELETE FROM interacoes WHERE usuario_id = ? AND publicacao_id = ? AND tipo = ?`, [id_usuario, id_publicacao, 'like']);
        await db.run(`INSERT OR IGNORE INTO interacoes (usuario_id, publicacao_id, tipo) VALUES (?, ?, ?)`, [id_usuario, id_publicacao, 'dislike']);
        return { sucesso: true };
    } catch (erro) {
        console.error('Erro ao dar dislike:', erro);
        return { sucesso: false, mensagem: 'Erro interno' };
    }
}