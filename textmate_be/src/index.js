import mongoose from "mongoose";
import { ExceptionHandler } from "winston";
import app from "./app.js";
import logger from './configs/logger.config.js';


//env variables
const {DATABASE_URL} = process.env;
//check PORT if not then default 8000
const PORT = process.env.PORT || 8000;

console.log("Mode: "+process.env.NODE_ENV);

//listen to PORT defined
let server;
server = app.listen(PORT,()=>{
    logger.info('server is listening at '+PORT);
    console.log("process id: ",process.pid);
});

//exit on mongodb error
mongoose.connection.on('error',(err)=>{
    logger.error("Mongodb connection error: "+err);
    process.exit(1);
});

//mongo debug mode
if(process.env.NODE_ENV!=="production"){
    mongoose.set("debug",true);
}

//mongodb connection
mongoose.connect(DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    logger.info("Connected to mongoDB.");
});

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    ExceptionHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM",() =>{
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    }
});
