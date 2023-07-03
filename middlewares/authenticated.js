const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const { users, customers } = require("../models");

let auth = {};


auth.IsAdmin = asyncHandler(async (req, res , next) => {
   let token;
   if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
   }
   if (token) {
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if (decode.role == "admin") {
            req.user = await users.findByPk(decode.id);
            if (req.user) {
                next();
            } else {
                return next(new ErrorResponse("you are not authorized to access this route", 401));
            }
        } else {
            return next(new ErrorResponse("you are not authorized to access this route", 401));
        }
    } catch (error) {
        return next(new ErrorResponse("you are not authorized to access this route", 401));
    }
   } else {
    return next(new ErrorResponse("you are not authorized to access this route", 401));
   }
});

auth.IsUser = asyncHandler(async (req, res , next) => {
    let token;
    if (req.headers.authorization) {
     token = req.headers.authorization.split(" ")[1];
    }
    if (token) {
     try {
         const decode = jwt.verify(token,process.env.JWT_SECRET);
         if (['admin', 'deliveryman', 'manager'].includes(decode.role)) {
             req.user = await users.findByPk(decode.id);
             if (req.user) {
                 next();
             } else {
                 return next(new ErrorResponse("you are not authorized to access this route", 401));
             }
         } else {
             return next(new ErrorResponse("you are not authorized to access this route", 401));
         }
     } catch (error) {
         return next(new ErrorResponse("you are not authorized to access this route", 401));
     }
    } else {
     return next(new ErrorResponse("you are not authorized to access this route", 401));
    }
 });


 auth.IsCustomer = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
     token = req.headers.authorization.split(" ")[1];
    }
    if (token) {
     try {
         const decode = jwt.verify(token,process.env.JWT_SECRET);
         if (true) {
             req.user = await customers.findByPk(decode.id);
             if (req.user) {
                 next();
             } else {
                 return next(new ErrorResponse("you are not authorized to access this route", 401));
             }
         } else {
             return next(new ErrorResponse("you are not authorized to access this route", 401));
         }
     } catch (error) {
         return next(new ErrorResponse("you are not authorized to access this route", 401));
     }
    } else {
     return next(new ErrorResponse("you are not authorized to access this route", 401));
    }
 })

 
module.exports = auth;