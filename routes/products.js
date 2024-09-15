const express = require('express')
const router = express.Router();

const productQueries = require('../db/queries/productQueries');
const marketplacesQueries = require('../db/queries/marketplaceQueries');

const pool = require('../db/connection'); 
const authenticationRequestByFirebase = require('../utils/authenticationByFirebase').authenticationRequestByFirebase

const multer = require('multer');
const path = require('path');
const fs = require('fs');


let connection


let index = 0
let name = ""


router.get('/get', authenticationRequestByFirebase,  async (req, res) => {
    const { page, limit, search = '', marketplace_id } = req.query;        

    // Convert page and limit to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const marketplaceId = parseInt(marketplace_id);

    // Calculate the offset for pagination
    const offset = (pageNumber - 1) * limitNumber;

    let connection;
    try {
        connection = await pool.getConnection();        

        const products = await productQueries.getProductsPaging(connection, req.user.user_id, marketplaceId, search, limitNumber, offset )

        // Respond with the products and pagination info
        return res.status(200).json({
            message: "Products retrieved successfully",
            result: products
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderPath = path.resolve('uploads/temp/'+req.user.user_id);
        // Check if the folder exists
        if (!fs.existsSync(folderPath)) {
            // Create the folder if it does not exist
            fs.mkdirSync(folderPath, { recursive: true });
            
            cb(null, 'uploads/temp/'+req.user.user_id);
        }else{
            cb(null, 'uploads/temp/'+req.user.user_id);
        }
    },
    filename: function (req, file, cb) {
        if(index === 0){
            name = "thumbnail"
        }else if(index === 1){
            name = "image1"
        }else if(index === 2){
            name = "image2"
        }else if(index === 3){
            name = "image3"
        }else if(index === 4){
            name = "image4"
        }

        const extension = path.extname(file.originalname);

        
        cb(null, name + extension); 
        index++
    }
  });

  const fileFilter = (req, file, cb) => {    
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || 'image/*') {
      cb(null, true); // Accept file
    } else {
      cb(new Error('Invalid file type'), false); // Reject file
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
  });

router.post("/", authenticationRequestByFirebase,  upload.array('files'),  async (req, res, next)=>{
    const images = req.files.map(file => `uploads/${file.filename}`);

    if(images.length > 5){
        return res.status(500).json({
            message: 'You can only upload up to 5 images',
            result: null,
        })
    }else if(images.length < 1){
        return res.status(500).json({
            message: 'You must upload at least 1 image',
            result: null,
        })
    }

    const user = req.user

    
    try {
        connection = await pool.getConnection();

        const { 
            product_name, 
            product_description,  
            product_price, 
            product_quantity,
            product_width,
            product_height,
            product_weight,
            product_length,
            product_discount,
            marketplace_id,
            marketplace_name,
            marketplace_lat,
            marketplace_lng,
            product_owner_id,
            date_added,
            date_modified,
        } = req.body;

        if(product_owner_id.replace(/^"(.*)"$/, '$1') !== user.user_id){
            return res.status(500).json({
                message: "Unauthorized: wrong product owner id",
                result: null,
            });
        }    


        // Parse the request body to get the marketplace data
        const product = {
            product_name: product_name.replace(/^"(.*)"$/, '$1'),
            product_description: product_description.replace(/^"(.*)"$/, '$1'),
            product_price: parseFloat(product_price),  
            product_quantity: parseFloat(product_quantity),  
            product_image_url : "",
            product_image1_url : "",
            product_image2_url : "",
            product_image3_url : "",
            product_image4_url : "",
            product_width: parseFloat(product_width),  
            product_height: parseFloat(product_height),  
            product_weight: parseFloat(product_weight),  
            product_length: parseFloat(product_length),  
            product_discount: parseFloat(product_discount),  
            marketplace_id: parseInt(marketplace_id),  
            marketplace_name: marketplace_name.replace(/^"(.*)"$/, '$1'),  
            marketplace_lat: parseFloat(marketplace_lat),  
            marketplace_lng: parseFloat(marketplace_lng), 
            product_owner_id: user.user_id,
            date_added: parseFloat(date_added),  // Parse date as float (Unix timestamp)
            date_modified: parseFloat(date_modified)  // Parse modified date as float
        };


        // Validate the parsed body
        const validationErrors = validateProductBody(product);
        if (validationErrors.length > 0) {
            return res.status(500).json({
                message: validationErrors[0],
                result: null,
            })
        }        


        const marketplace = await marketplacesQueries.getMarketplacesById(connection, product.marketplace_id)

        if (marketplace.length === 0) {
            return res.status(500).json({
                message: 'Unauthorized: No marketplace founded',
                result: null,
            })
        }
        
        // Ensure that the `marketplace_owner_id` matches the authenticated user
        if (marketplace.marketplace_owner_id !== user.user_id) {
            return res.status(500).json({
                message: "Unauthorized: wrong marketplace owner id " + "marketplace_owner_id :",
                result: null,
            });
        }  

        product['marketplace_name'] = product.marketplace_name.replace(/\"/g, "")


        // Ensure that the `marketplace_owner_id` matches the authenticated user
        if (marketplace.marketplace_name !== product.marketplace_name) {
            return res.status(500).json({
                message: "Unauthorized: Marketplace error" + " "+marketplace.marketplace_name + " "+product.marketplace_name,
                result: null,
            });
        }  

        

        // Ensure that the `marketplace_owner_id` matches the authenticated user
        if (marketplace.lat !== product.marketplace_lat ) {
            return res.status(500).json({
                message: "Unauthorized: Latitude error",
                result: null,
            });
        }  

        // Ensure that the `marketplace_owner_id` matches the authenticated user
        if (marketplace.lng !== product.marketplace_lng) {
            return res.status(500).json({
                message: "Unauthorized: Longitude error",
                result: null,
            });
        }  

       

        // Add the new marketplace to the database
        const result = await productQueries.addNewProduct(connection, product);

        if(result.result !== true){
            return res.status(500).json({
                message: "Error on adding product",
                result: null,
            })
        }else{
            const insertedProductId = result.insertId;   
            
            console.log("categories", req.body.categories);
            

            const updateImagesResults = await productQueries.updateImagesResults(connection, insertedProductId, images)
            const insertCategoriesResults = await productQueries.addNewProductCategories(connection, insertedProductId, req.body.categories)

            index = 0
            name = ""
            
            await changeFilesDestionation(insertedProductId, fs, req.files, user.user_id);

            return res.status(200).json({
                message: "Product is added Successfuly",
                result: true
            });
        }

        

    } catch (error) {
        index = 0
        name = ""
        return res.status(500).json({
            message: "Error: "+ error,
            result: null
        })
    } finally {
        if (connection) {
            connection.release();
        }
    }
})

const changeFilesDestionation= async(insertedProductId, fs, files, user_id) =>{
    return new Promise(async (resolve, reject) => {
        const finalProductFolder = path.resolve(`public/images/products/${insertedProductId}`);
    if (!fs.existsSync(finalProductFolder)) {
        // Create the folder if it does not exist
        fs.mkdirSync(finalProductFolder, { recursive: true });
    }

    // Move the uploaded images from temp to the final folder
    for (const file of files) {
        const tempFilePath = path.resolve(`uploads/temp/${user_id}/${file.filename}`);
        const finalFilePath = path.resolve(`${finalProductFolder}/${file.filename}`);

        try {
            await fs.rename(tempFilePath, finalFilePath, (err) => reject(err));
        } catch (error) {           
            reject(error.message)
        }
        
    }

    resolve(true)

    });
} 


function validateProductBody(body) {
    const errors = [];

    // Check if required fields are present and valid
    if (!body.product_name || typeof body.product_name !== 'string') {
        errors.push("Product name is missing or invalid");
    }

    if (!body.product_description || typeof body.product_description !== 'string') {
        errors.push("Product description is missing or invalid");
    }

    if (!body.product_price || isNaN(body.product_price)) {
        errors.push("Product price is missing or invalid");
    }

    if (!body.marketplace_id || isNaN(body.marketplace_id)) {
        errors.push("Marketplace ID is missing or invalid");
    }

    if (!body.marketplace_name || typeof body.marketplace_name !== 'string') {
        errors.push("Marketplace name is missing or invalid");
    }

    // Add more checks for other fields (like latitude, longitude, dates, etc.)
    if (!body.marketplace_lat || isNaN(body.marketplace_lat)) {
        errors.push("Marketplace latitude is missing or invalid");
    }

    if (!body.marketplace_lng || isNaN(body.marketplace_lng)) {
        errors.push("Marketplace longitude is missing or invalid");
    }

    // Return the error array (empty if no errors)
    return errors;
}


module.exports = router;
