const connection = require('../connection');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const AWS = require('aws-sdk');
const s3 = new AWS.S3();


exports.getProductById = (connection, id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const query = `SELECT * FROM products WHERE product_id = ?`;
            const results = await connection.query(query,[id]);
            if (results[0].length === 0) {
                reject("No products are found");
            }else{
                resolve(results[0][0]);
            }
        } catch (error) {
            reject(error.message)
        }
    });
};

exports.addNewProduct = (connection, product) => {
    return new Promise(async(resolve, reject) => {
        try {

            const query = "INSERT INTO products (product_name, product_description, product_price, product_quantity, product_width, product_height, product_weight, product_length, product_discount, marketplace_id, marketplace_name, marketplace_lat, marketplace_lng, product_status, is_global, product_owner_id, date_added, date_modified) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

            const values = [
                product.product_name,
                product.product_description,
                product.product_price,
                product.product_quantity,
                product.product_width,
                product.product_height,
                product.product_weight,
                product.product_length,
                product.product_discount,
                product.marketplace_id,
                product.marketplace_name,
                product.marketplace_lat,
                product.marketplace_lng,
                0,
                0,
                product.product_owner_id,
                product.date_added,
                product.date_modified,
            ];

            const result = await connection.query(query, values);             

            if(result[0]["affectedRows"] > 0){
                const insertId = result[0]["insertId"]
                resolve({
                    result : true, 
                    insertId: insertId
                });
            }else{
                reject("Error: Can't add Product");
            }

        } catch (error) {
            reject(error.message)
        }
    });
};

exports.uploadProductImages = (connection, productId, files) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Validate input
            if (!productId || !files || !Array.isArray(files) || files.length === 0) {
                return reject('Missing required fields: productId, or files array');
            }

            // Validate each file object has required properties
            for (const file of files) {
                if (!file.fileContent || !file.fileName || !file.contentType) {
                    return reject('Each file must have fileContent, fileName, and contentType');
                }
            }

            // Function to upload a single file to S3
            const uploadFile = async (file) => {
                const decodedFile = Buffer.from(file.fileContent, 'base64');
                const params = {
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: `products/${productId}/${file.fileName}`,
                    Body: decodedFile,
                    ContentType: file.contentType,
                    ACL: 'public-read',
                };

                // Upload file to S3
                await s3.putObject(params).promise();
                // Return the image URL
                return `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
            };

            // Process all files concurrently
            const uploadPromises = files.map((file) => uploadFile(file));
            const imageUrls = await Promise.all(uploadPromises);

            // Assign URLs based on the number of images
            let imageUrl = '';
            let image1Url = '';
            let image2Url = '';
            let image3Url = '';
            let image4Url = '';

            if (imageUrls.length > 0) imageUrl = imageUrls[0];
            if (imageUrls.length > 1) image1Url = imageUrls[1];
            if (imageUrls.length > 2) image2Url = imageUrls[2];
            if (imageUrls.length > 3) image3Url = imageUrls[3];
            if (imageUrls.length > 4) image4Url = imageUrls[4];

            // Ensure all fields are properly assigned
            const query = `
                UPDATE \`products\`
                SET 
                    \`product_image\` = ?, 
                    \`product_image1\` = ?, 
                    \`product_image2\` = ?, 
                    \`product_image3\` = ?, 
                    \`product_image4\` = ? 
                WHERE 
                    \`product_id\` = ?;
            `;

            const values = [imageUrl, image1Url, image2Url, image3Url, image4Url, productId];

            const result = await connection.query(query, values);

            if (result[0]?.affectedRows > 0) {
                resolve(true);
            } else {
                reject("Error: Can't update images links");
            }
        } catch (error) {
            reject(`Error uploading images: ${error.message}`);
        }
    });
};

