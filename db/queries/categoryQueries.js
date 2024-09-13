const connection = require('../connection');

// Example query function: Fetch all records from a table
exports.getCategoriesByName = (connection, searchText) => {
    return new Promise(async(resolve, reject) => {
        try {
            const query = `SELECT * FROM categories WHERE category_name LIKE ? OR category_name_ar LIKE ?`;
            const results = await connection.query(query,["%"+searchText+"%", "%"+searchText+"%"]);
            if (results[0].length === 0) {
                reject("No categories are found");
            }else{
                let categories = [];
                results[0].forEach(category => {
                    categories.push(category);
                });
                
                resolve(categories);
            }
        } catch (error) {
            reject(error.message)
        }
    });
};




