const connection = require('../connection');

// Example query function: Fetch all records from a table
exports.getMarketplacesByCityIdAndOwner = (connection, cityId, ownerId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const query = `SELECT * FROM marketplaces WHERE city_id = ? AND marketplace_owner_id = ? AND is_approved = ?`;
            const results = await connection.query(query,[cityId, ownerId, true]);
            if (results[0].length === 0) {
                reject("No marketplaces are found");
            }else{
                let marketplaces = [];
                results[0].forEach(marketplace => {
                    marketplaces.push(marketplace);
                });
                
                resolve(marketplaces);
            }
        } catch (error) {
            reject(error.message)
        }
    });
};

exports.getMarketplacesById = (connection, id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const query = `SELECT * FROM marketplaces WHERE marketplace_id = ? AND is_approved = ?`;
            const results = await connection.query(query,[id, true]);
            if (results[0].length === 0) {
                reject("No marketplaces are found");
            }else{
                let marketplaces = [];                
                resolve(results[0][0]);
            }
        } catch (error) {
            reject(error.message)
        }
    });
};

exports.addNewMarketplace = (connection, marketplace) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `
                INSERT INTO marketplaces (
                    marketplace_name,
                    lat,
                    lng,
                    city_id,
                    city_name,
                    marketplace_owner_id,
                    is_approved
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;


            const result = await connection.query(query, [
                marketplace.marketplaceName,
                marketplace.lat,
                marketplace.lng,
                marketplace.cityId,
                marketplace.cityName,
                marketplace.marketplaceOwnerId,
                marketplace.isApproved,
        
            ]);    
                    
               
            if(result[0]["affectedRows"] > 0){
                resolve(true);
            }else{
                reject("Error: Can't add Marketplace");
            }
            

        } catch (error) {
            reject(error.message);
        }
    });
};


