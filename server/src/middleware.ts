import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { secret } from "./config";

export function authMiddleware(req : Request , res : Response , next : NextFunction) {
    const token = req.headers['authorization']

    if(token) {
        const decoded = jwt.verify(token , secret)
        if(decoded) {
            //@ts-ignore
            req.userId = decoded._id;
            next();
        } else {
            res.json({
                message : "something went wrong"
            })
        }
    } else {
        res.json({
            message : 'no token provided'
        })
    }
}