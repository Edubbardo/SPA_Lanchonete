import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default async function ConectarDB(){
    return open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });
}