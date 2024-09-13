const connection = require('../connection');

// Example query function: Fetch all records from a table
exports.getUserById = (connection, userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const query = `SELECT * FROM users WHERE user_id = ?`;
            const results = await connection.query(query,[userId]);
            if (results[0].length === 0) {
                reject("User not found");
            }else{
                resolve({
                    "user_id" : results[0][0].user_id,
                    "username" : results[0][0].username,
                    "email" : results[0][0].email,
                    "phone_number" : results[0][0].user_id,
                    "image_url" : results[0][0].image_url,
                    "role" : results[0][0].role,
                    "city_id" : results[0][0].city_id,
                    "city_name" : results[0][0].city_name,
                    "points" : results[0][0].points,
                    "enabled" : results[0][0].enabled,
                });
            }
        } catch (error) {
            reject(error.message)
        }
    });
};

exports.addNewUser = (connection, userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = "INSERT INTO users (`user_id`, `username`, `email`, `phone_number`, `image_url`, `role`, `city_id`, `city_name`, `points`, `enabled`) VALUES (?,?,?,?,?,?,?,?,?,?);"
            const result = await connection.query(query,[
                userData.userId,
                userData.userName,
                userData.email,
                userData.phoneNumber,
                userData.imageUrl,
                "CUSTOMER",
                userData.cityId,
                userData.cityName,
                0,
                true,
            ]);            

            if(result[0]["affectedRows"] > 0){
                resolve(true);
            }else{
                reject("Error: Can't add user");
            }
        } catch (error) {
            reject(error.message)
        }
    });
};


