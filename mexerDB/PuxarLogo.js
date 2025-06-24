import conectarBanco from '../conectarBanco.js'

export default async function PuxarLogo(){
    try{
        const db = await conectarBanco()
        const resultado = await db.get('SELECT logo AS logo FROM Empresas')
        const Logo = resultado.logo
        return Logo
    }catch(erro){
        console.error('Erro ao contar likes:', erro);
        throw erro;
    }
}