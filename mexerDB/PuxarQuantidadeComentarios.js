import conectarBanco from '../conectarBanco.js'

export default async function PuxarQuantidadeComentarios(id_publicacao){
    try{
        const db = await conectarBanco()
        const resultado = await db.get(`SELECT COUNT(*) as total FROM comentarios WHERE publicacao_id = ?`,[id_publicacao])
        return resultado.total
    }catch(erro){
        console.error('Erro ao puxar qtd comentario:', erro);
        throw erro;
    }
}