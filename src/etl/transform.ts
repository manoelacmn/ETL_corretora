// Importar a definição do tipo Item
import Item from  "../models/Item"  // Ajuste o caminho conforme necessário

/**
 * Transforma os dados extraídos do CSV.
 * @param items Array de itens extraídos do CSV como objetos com propriedades de string.
 * @returns Array de itens transformados com tipos corretos.
 */
function transformData(items: Array<{ id?: string; description: string; checked: string }>): Item[] {
    return items.map(item => ({
        id: item.id ? parseInt(item.id) : undefined,  // Convertendo o id para número, se não for undefined
        description: item.description,
        checked: item.checked === 'true'  // Convertendo string 'true' ou 'false' para booleano
    }));
}
