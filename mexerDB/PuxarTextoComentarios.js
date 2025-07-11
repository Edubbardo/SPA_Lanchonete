import conectarBanco from '../conectarBanco.js'

export default async function PuxarTextoComentarios(id_publicacao){
    try{
        const db = await conectarBanco()
    const resposta = await db.all(`SELECT usuario_id, texto as ctexto FROM comentarios WHERE publicacao_id = ?`,[id_publicacao])
    return resposta.ctexto

    }catch(erro){
        console.error('Erro ao puxar texto comentario:', erro);
        throw erro;
    }    
}