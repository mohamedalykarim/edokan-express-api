const firebaseConfig = require('../config/firebase-config');


exports.authenticationByFirebase = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {    
            // Extract the Firebase ID token from the request headers
            const idToken = req.headers.Authorization || req.headers.authorization;            
   
            if (!idToken) {
                reject("Unauthorized: No token provided");
                return
            }

    
            // Verify the ID token
            let decodedToken;
            try {
                decodedToken = await firebaseConfig.auth().verifyIdToken(idToken);
            } catch (error) {
                reject(error.message);
                return
            }
    
            if (!decodedToken) {
                reject("Token verification failed");
                return
            }else{              
                const uid = decodedToken.uid; 
                           
                resolve(uid)
                return
            }
    
    
        } catch (error) {
            console.log(error);
            
            reject(error.message);
            return
        }
    });
};

exports.authenticationRequestByFirebase = async (req, res, next) => {
    try {
      // Extract the Firebase ID token from the request headers
      const idToken = req.headers.authorization || req.headers.Authorization;
      
  
      if (!idToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
  
      // Verify the ID token
      let decodedToken;
      
      try {
        decodedToken = await firebaseConfig.auth().verifyIdToken(idToken);
      } catch (error) {
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
      }
      
  
      if (!decodedToken) {
        return res.status(403).json({ message: 'Unauthorized: Token verification failed' });
      }
  
      // Attach user info to the request object for further use
      req.user = decodedToken;

      next(); 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };