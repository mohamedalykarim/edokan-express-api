const express = require('express')
const router = express.Router();

const marketplacesQueries = require('../db/queries/marketplaceQueries');

const pool = require('../db/connection'); 
const authenticationByFirebase = require('../utils/authenticationByFirebase').authenticationByFirebase

let connection;


/**
 * Add a marketplace
 */

router.post("/", async (req, res, next)=>{
    try {
        connection = await pool.getConnection();
        // Authenticate
        const uid = await authenticationByFirebase(req);

        // Check if the body is a string and parse it if necessary
        let body = req.body;
        if (typeof body === 'string') {
            body = JSON.parse(body);
        }


        // Parse the request body to get the marketplace data
        const marketplaceData = {
            marketplaceName: body.marketplace_name,
            lat: body.lat,
            lng: body.lng,
            cityId: body.city_id,
            cityName: body.city_name,
            marketplaceOwnerId: body.marketplace_owner_id,
            isApproved: body.is_approved,
        };


        
        
        // Ensure that the `marketplace_owner_id` matches the authenticated user
        if (marketplaceData.marketplaceOwnerId !== uid) {
            return req.status(500).json({ message: 'Unauthorized: Owner ID does not match the authenticated user' });
        }

        // Add the new marketplace to the database
        const result = await marketplacesQueries.addNewMarketplace(connection, marketplaceData);

        console.log(result);
        

        if(result){
            return res.status(200).json({ message: "Marketplace is added Successfuly", result });                
        }else{
            return res.status(500).json({ message: "Error: Can't add Marketplace", result });
        }


    } catch (error) {
        return res.status(500).json({ message: error, result: null });
    } finally {
        if (connection) {
            connection.release();
        }
    }
})

/**
 * Get Marketplace by city and owner
 */
router.get("/:city_id/:marketplace_owner_id", async (req, res, next)=>{

    try {
        connection = await pool.getConnection();

        const uid = await authenticationByFirebase(req);

        
        const city_id = req.params.city_id
        const marketplace_owner_id = req.params.marketplace_owner_id

        
        

        // Retrieve user data from your database
        const result = await marketplacesQueries.getMarketplacesByCityIdAndOwner(connection, city_id, marketplace_owner_id);

        if(result == undefined){
            return res.status(500).json({ message: "There ar no marketplaces for this user in this city", result: null });
        }else{
            return res.status(200).json({ message: 'Marketplaces exist', result: result });
        }
        


    } catch (error) {        
        return res.status(500).json({ message: error.message, result: null });
    }finally {
        if (connection) {
            connection.release();
        }
    }
    
})




module.exports = router;
