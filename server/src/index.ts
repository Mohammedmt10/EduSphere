import express from 'express'
import {z} from 'zod';
import { adminModel, courseModel, purchasedCourseModel, userModel } from './db';
import bcrypt, { hash } from 'bcrypt';
import cors from 'cors'
import jwt from 'jsonwebtoken';
import { secret } from './config';
import cookieParser, { signedCookie } from 'cookie-parser';
import { authMiddleware } from './middleware';


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
            error : safeParsed.error.issues[0].path[0],
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
        if(user?.password) {
            const passwordVerification = await bcrypt.compare(userData.password , user.password);
            if(passwordVerification) {
                const token = jwt.sign({
                    _id : user._id
                } , secret , {expiresIn : '24hr'});
                res.json({  
                    token : token
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

app.post('/adminsignup' , async (req , res , next) => {
    const body = z.object({
        username: z.string().min(3).max(30),
        password : z.string().min(3).max(30).regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
    });
    
    const safeParsed = body.safeParse(req.body);

    if(safeParsed.success) {
        const user = safeParsed.data;

        try{
            const sameUser = await adminModel.findOne({username : user.username});

            if(sameUser) {
                res.json({
                    message : 'admin already exist'
                })
            }

            const hashedpassword = await bcrypt.hash(user.password , 5);

            const newUser = await adminModel.create({
                username : user.username,
                password : hashedpassword
            });

            res.json({
                message : 'new admin created'
            })

        } catch(e) {
            res.json({
                message : 'some error',
                error : e
            })
        }
    } else {
        res.json({
            error : safeParsed.error.issues[0].path[0],
            message : 'not passed safely'
        })
    }
});

app.post('/adminsignin' , async (req , res , next) => {
    const requiredBody = z.object({
        username : z.string().max(30).min(3),
        password : z.string().max(30).min(3).regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
    });

    const safeParsed = requiredBody.safeParse(req.body);

    if(safeParsed.success) {
        const userData = safeParsed.data;
        const user = await adminModel.findOne({
            username : userData.username
        })
        if(user?.password) {
            const passwordVerification = await bcrypt.compare(userData.password , user.password);
            if(passwordVerification) {
                const token = jwt.sign({
                    _id : user._id
                } , secret , {expiresIn : '24hr'});
                res.json({  
                    token : token
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


app.get('/me' , authMiddleware , async (req , res ) => {
    //@ts-ignore
    const userId = req.userId;

    const user = await userModel.findOne({
        _id : userId
    })

    res.json({user})
})

app.post('/createCourse' , authMiddleware , async (req , res) => {
    //@ts-ignore
    const userId = req.userId
    const requiredBody = z.object({
        title : z.string().min(3),
        description : z.string(),
        price : z.number(),
        imageUrl : z.string()
    });

    const safeParsed = requiredBody.safeParse(req.body);

    if(safeParsed.success) {
        const data = safeParsed.data
        const response = await courseModel.findOne({
            userId : userId,
            title : data.title
        })
        if(response) {
            res.json({
                message : "course already exist"
            })
        }
        const newCourse = await courseModel.create({
            title : data.title,
            description : data.description,
            price : data.price,
            imageUrl : data.imageUrl,
            userId : userId
        });

        if(newCourse) {
            res.json({
                message : 'course created'
            })
        }
        res.json({
            message : 'something went wrong'
        })
    } else {
        res.json({
            message : 'invalid input'
        })
    }

})

app.post('/buy' , authMiddleware , async (req , res ) => {
   //@ts-ignore
    const userId = req.userId;
    const courseId = req.body;

    const response = await purchasedCourseModel.findOne({
        userId : userId,
        courseId : courseId
    })
    
    if(response) {
        res.json({
            message : 'already purchased'
        })
    }

    const purchase = await purchasedCourseModel.create({
        userId : userId,
        courseId : courseId
    })

    if(purchase) {
        res.json({
            message : "purchased"
        })
    }
})

app.listen(3000);