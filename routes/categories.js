const express = require('express')
const router = express.Router();

const categortQueries = require('../db/queries/categoryQueries');
const pool = require('../db/connection'); 
const authenticationByFirebase = require('../utils/authenticationByFirebase').authenticationByFirebase

let connection;

router.get("/:category_name", async(req, res, next)=>{
    try {
        connection = await pool.getConnection();

        const uid = await authenticationByFirebase(req);

        const searchString = req.params.category_name
        

        // Retrieve user data from your database
        const result = await categortQueries.getCategoriesByName(connection, searchString)

        if(result == undefined){
            return res.status(500).json({ message: "There are no categories for this user in this city", result: null });
        }else{
            return res.status(200).json({ message: 'Categories retrieved successfully', result: result });
        }
        


    } catch (error) {        
        return res.status(500).json({ message: error, result: null });
    }finally {
        if (connection) {
            connection.release();
        }
    }
})



module.exports = router;
