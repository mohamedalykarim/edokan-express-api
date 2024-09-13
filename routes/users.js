const express = require('express')
const router = express.Router();

const userQueries = require('../db/queries/userQueries');
const pool = require('../db/connection'); 
const authenticationByFirebase = require('../utils/authenticationByFirebase').authenticationByFirebase

let connection;

router.get("/", async(req, res, next)=>{
    try {
        
        connection = await pool.getConnection();

        const uid = await authenticationByFirebase(req);
        
        // Retrieve user data from your database
        const result = await userQueries.getUserById(connection, uid);

        if(result == undefined){
            return res.status(500).json({
                message: "User isn't exist",
                result: null
            })
        }else{
            return res.status(200).json({
                message: "User exists",
                result: result
            })
        }
        


    } catch (error) {
        return res.status(500).json({
            message: "Error: "+ error,
            result: null
        })  
    }finally {
        if (connection) {
            connection.release();
        }
    }
})


router.post("/", async(req, res, next)=>{

    try {
        connection = await pool.getConnection();

        console.log("body");

        const userId = await authenticationByFirebase(req);  

        let body = req.body;

        

        if (typeof body === 'string') {
            body = JSON.parse(body);
        }

        
        // Extract the Firebase ID token from the request headers
        const idToken = req.headers.Authorization || req.headers.authorization;
        const userName = body.username
        const email = body.email
        const phoneNumber = body.phone_number
        const imageUrl = body.image_url
        const cityId = body.city_id
        const cityName = body.city_name

        let userData = { userId, userName, email, phoneNumber, imageUrl, cityId, cityName }
        

        // Retrieve user data from your database
        const result = await userQueries.addNewUser(connection, userData);

        if(result == true){
            res.status(200).json({
                message: "User added successfully",
                result: true
            }) 
        }else{
            res.status(500).json({
                message: "Can't add user",
                result: null
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Error: "+ error,
            result: null
        }) 
    }finally {
        if (connection) {
            connection.release(); // Release the connection back to the pool
        }
    }
})


module.exports = router;
