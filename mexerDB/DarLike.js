import ConectarDB from '../conectarBanco.js';

export default async function DarLike({id_usuario,id_publicacao}) {
    try {
        const db = await ConectarDB();
         await db.run(`DELETE FROM interacoes WHERE usuario_id = ? AND publicacao_id = ? AND tipo = ?`, [id_usuario, id_publicacao, 'dislike'])   
         await db.run(`INSERT OR IGNORE INTO interacoes (usuario_id, publicacao_id, tipo) VALUES(?,?,?)` ,[id_usuario, id_publicacao, 'like']) 
        return {sucesso : true}
    } catch (erro) {
        console.error('Erro ao dar like:', erro);
        return {sucesso: false, mensagem : 'Erro interno'}
    }
}
