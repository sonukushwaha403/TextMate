import { createUser } from "../routes/auth.service.js";
import {generateToken} from "../services/token.service.js";

export const register = async(req,res,next)=>{
    try{
        const {name,email,picture,status,password} = req.body;
        const newUser = await createUser({
            name,
            email,
            picture,
            status,
            password,
        });

        //token pass
        const access_token = await generateToken({userId: newUser._id},"1d",process.env.ACCESS_TOKEN_SECRET);

        const refresh_token = await generateToken({userId: newUser._id},"30d",process.env.REFRESH_TOKEN_SECRET);

        //refresh token in cookies
        res.cookie('refreshToken',refresh_token,{
            httpOnly: true,
            path:'/api/v1/auth/refreshtoken',
            maxAge:30*24*60*60*1000, //30 days
        });

        console.table({access_token,refresh_token});


        res.json({
            message: "register success.",
            access_token,
            user:{
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
            },
        });
    }
    catch (error){
        next(error);
    }
};

export const login = async(req,res,next)=>{
    try{

    }
    catch (error){
        next(error);
    }
};

export const logout = async(req,res,next)=>{
    try{

    }
    catch (error){
        next(error);
    }
};

