import fs from 'fs';
import csv from 'csv-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Item } from './Item';  // Ajuste o caminho conforme necessário

/**
 * Abre uma conexão com o banco de dados SQLite.
 */
async function openDb() {
    return open({
        filename: './mydatabase.db',
        driver: sqlite3.Database
    });
}

/**
 * Transforma os dados extraídos do CSV.
 * @param items Array de itens extraídos do CSV como objetos com propriedades de string.
 * @returns Array de itens transformados com tipos corretos.
 */
function transformData(items: Array<{ id?: string; description: string; checked: string }>): Item[] {
    return items.map(item => ({
        id: item.id ? parseInt(item.id) : undefined,
        description: item.description,
        checked: item.checked === 'true'
    }));
}

/**
 * Carrega dados transformados em um banco de dados SQLite.
 * @param items Array de itens transformados.
 */
async function loadIntoDatabase(items: Item[]): Promise<void> {
    const db = await openDb();
    await db.run('CREATE TABLE IF NOT EXISTS Items (id INTEGER PRIMARY KEY, description TEXT, checked BOOLEAN)');
    try {
        const insert = db.prepare('INSERT INTO Items (id, description, checked) VALUES (?, ?, ?)');
        for (const item of items) {
            await insert.run(item.id, item.description, item.checked);
        }
        await insert.finalize();
    } catch (error) {
        console.error('Error loading data into SQLite database:', error);
    }
    await db.close();
}

/**
 * Lê o arquivo CSV e inicia o processo ETL.
 * @param filePath Caminho para o arquivo CSV.
 */
function readAndProcessCSV(filePath: string): void {
    let items: Array<{ id?: string; description: string; checked: string }> = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => items.push(data))
        .on('end', async () => {
            console.log('CSV file successfully processed');
            const transformedItems = transformData(items);
            await loadIntoDatabase(transformedItems);
        });
}

// Path para o arquivo CSV
const csvFilePath = 'path/to/your/Items.csv';
readAndProcessCSV(csvFilePath);
