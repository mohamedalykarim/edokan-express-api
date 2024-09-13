const express = require('express')
const router = express.Router();

const productQueries = require('../db/queries/productQueries');
const marketplacesQueries = require('../db/queries/marketplaceQueries');

const pool = require('../db/connection'); 
const authenticationByFirebase = require('../utils/authenticationByFirebase').authenticationByFirebase
const authenticationRequestByFirebase = require('../utils/authenticationByFirebase').authenticationRequestByFirebase

const multer = require('multer');
const path = require('path');

let connection


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images/products/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  });

  const fileFilter = (req, file, cb) => {
    console.log(file.mimetype);
    
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

    if (!req.files || req.files.length === 0) {
        return res.status(500).json({ message: 'No files uploaded' });
    }

    

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    console.log(imageUrls);
    
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
            date_added,
            date_modified,
        } = req.body;

        // Parse the request body to get the marketplace data
        const product = {
            product_name : product_name,
            product_description:   product_description,
            product_price: product_price,
            product_quantity: product_quantity, 
            product_width: product_width,
            product_height: product_height,
            product_weight: product_weight,
            product_length: product_length,
            product_discount: product_discount,
            marketplace_id: marketplace_id,
            marketplace_name: marketplace_name,
            marketplace_lat: marketplace_lat,
            marketplace_lng: marketplace_lng,
            product_owner_id: uid,
            date_added: date_added,
            date_modified: date_modified,
        };

        // Validate the parsed body
        const validationErrors = validateProductBody(body);
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
        if (marketplace.marketplace_owner_id !== uid || 
            marketplace.marketplace_name !== product.marketplace_name || 
            marketplace.lat !== product.marketplace_lat ||
            marketplace.lng !== product.marketplace_lng
        ) {
            return res.status(500).json({
                message: "Unauthorized: Error on product data that required adding",
                result: null,
            });
        }        

       

        // Add the new marketplace to the database
        const result = await productQueries.addNewProduct(connection, product, files);

        if(result.result !== true){
            return res.status(500).json({
                message: "Error on adding product",
                result: null,
            })
        }else{

        }

        return res.status(200).json({
            message: "Product is added Successfuly",
            result
        });

    } catch (error) {
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


function validateProductBody(body) {
    const errors = [];

    // Check if required fields are present and valid
    if (!body.product_name || typeof body.product_name !== 'string') {
        errors.push("Product name is missing or invalid");
    }

    if (!body.product_description || typeof body.product_description !== 'string') {
        errors.push("Product description is missing or invalid");
    }

    if (!body.product_price || isNaN(parseFloat(body.product_price.replace(",", ".")))) {
        errors.push("Product price is missing or invalid");
    }

    if (!body.product_quantity || isNaN(parseFloat(body.product_quantity.replace(",", ".")))) {
        errors.push("Product quantity is missing or invalid");
    }

    if (!body.marketplace_id || isNaN(parseInt(body.marketplace_id))) {
        errors.push("Marketplace ID is missing or invalid");
    }

    if (!body.marketplace_name || typeof body.marketplace_name !== 'string') {
        errors.push("Marketplace name is missing or invalid");
    }

    // Add more checks for other fields (like latitude, longitude, dates, etc.)
    if (!body.marketplace_lat || isNaN(parseFloat(body.marketplace_lat.replace(",", ".")))) {
        errors.push("Marketplace latitude is missing or invalid");
    }

    if (!body.marketplace_lng || isNaN(parseFloat(body.marketplace_lng.replace(",", ".")))) {
        errors.push("Marketplace longitude is missing or invalid");
    }

    // Return the error array (empty if no errors)
    return errors;
}


module.exports = router;
