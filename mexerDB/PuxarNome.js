import conectarBanco from '../conectarBanco.js'

export default async function PuxarNome(){
    try{
        const db = await conectarBanco()
        const resultado = await db.get('SELECT nome AS Empresa FROM Empresas')
        const nomeEmpresa = resultado.Empresa
        return nomeEmpresa
    }catch(erro){
        console.error('Erro ao contar likes:', erro);
        throw erro;
    }
}