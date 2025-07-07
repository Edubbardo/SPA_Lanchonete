import conectarBanco from '../conectarBanco.js'

export default async function PuxarPublicacoes(){
    try{
        const db = await conectarBanco()
        const resultado = await db.all('SELECT * FROM PUBLICACOES')
        return resultado
    }catch(erro){
        console.error('Erro ao contar likes:', erro);
        throw erro;
    }
}