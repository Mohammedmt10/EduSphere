import express from 'express'
import {z} from 'zod';
import { userModel } from './db';
import bcrypt, { hash } from 'bcrypt';
import cors from 'cors'
import jwt from 'jsonwebtoken';
import { secret } from './config';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware';
import Cookies from 'js-cookie';

const app = express();

app.use(cors());    
app.use(express.json())
app.use(cookieParser())
app.post('/signup' , async (req , res , next) => {
    const body = z.object({
        username: z.string().min(3).max(30),
        password : z.string().min(3).max(30).regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
    });
    
    const safeParsed = body.safeParse(req.body);

    if(safeParsed.success) {
        const user = safeParsed.data;

        try{
            const sameUser = await userModel.findOne({username : user.username});

            if(sameUser) {
                res.json({
                    message : 'user already exist'
                })
            }

            const hashedpassword = await bcrypt.hash(user.password , 5);

            const newUser = await userModel.create({
                username : user.username,
                password : hashedpassword
            });

            res.json({
                message : 'new user created'
            })

        } catch(e) {
            res.json({
                message : 'some error',
                error : e
            })
        }
    } else {
        res.json({
            message : 'not passed safely'
        })
    }
});

app.post('/signin' , async (req , res , next) => {
    const requiredBody = z.object({
        username : z.string().max(30).min(3),
        password : z.string().max(30).min(3).regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
    });

    const safeParsed = requiredBody.safeParse(req.body);

    if(safeParsed.success) {
        const userData = safeParsed.data;
        const user = await userModel.findOne({
            username : userData.username
        })
        console.log('hi there')
        if(user?.password) {
            const passwordVerification = await bcrypt.compare(userData.password , user.password);
            if(passwordVerification) {
                const token = jwt.sign({
                    _id : user._id
                } , secret , {expiresIn : '24hr'})
                res.cookie('token', token)
                res.json({
                    message : "signed in"
                })
            } else {
                res.json({
                    message : 'incorrect creds'
                })
            }
        } else {
            res.json({
                message : "no user found"
            })
        }
    } else {
        res.json({
            message : "some error"
        })
    }
})

app.get('/logout' , authMiddleware, (req , res , next) => {
    res.cookie('token' , null);
    res.json({
        message : 'logged out'
    })
})

app.post('/test' , authMiddleware , (req , res , next) => {
    res.json({
        message : 'can use'
    })
})

app.listen(3000);