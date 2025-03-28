import { Request, Response, NextFunction } from 'express';
import { verify as jwtVerify } from 'jsonwebtoken'

export const authenticateKey = async (req : Request, res : Response, next : NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({'message' : 'Unauthorized: API key is missing'});
    }
    next();
};

export const validJWTProvided = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    
  
        const authHeader = req.headers?.authorization;
  
        if (!authHeader || !authHeader?.startsWith('Bearer')) {
          console.log('no header ' + authHeader)
              res.status(401).send();
              return;
        }
  
       
        const token: string | undefined = authHeader.split(' ')[1];
  
        if (!token) { 
          res.status(401).send();
          return;
        }
        const secret = process.env.JWTSECRET || "not very secret";
      
  
        try{
          console.log(token);
          const payload = jwtVerify(token, secret);
          res.locals.payload = payload;
          next();
              
  
          } catch (err) {
             res.status(403).send();
             return;
          }
  
      };
  
      export const isAdmin = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        
         const role = res.locals?.payload?.role
  
         console.log('role is ' + role)
  
         if (role && role == 'admin') {
          next();
         }
         else {
          res.status(403).json({"opps" : "not an admin"});
       }
  
      };
  
  
  
