import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js"; 

//dotEnv config
dotenv.config();

//create express app
const app = express();

//Morgan log only in developer
if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}

//helmet log
app.use(helmet());

//parse json request url
app.use(express.json());

//parse json request body
app.use(express.urlencoded({extended: true}));

//sanitize request data
app.use(mongoSanitize());

//enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(fileUpload({
    useTempFiles: true
    })
);

//cors
app.use(cors());

//api v1 routes
app.use("/api/v1",routes);


app.post("/test",(req,res)=>{
    //req.file
    //res.send(req.body);
    throw createHttpError.BadRequest("this route has an error");
});

//sync
app.use(async(req,res,next)=>{
    next(createHttpError.NotFound("This route does not exist."));
});

//error handling
app.use(async(err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message: err.message,
        },
    })
});



//export default app
export default app;

