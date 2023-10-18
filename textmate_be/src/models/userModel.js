import mongoose from  "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema =mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please provide your name"],
        },
    email:{
        type: String,
        required: [true,"please provide your email address"],
        unqiue: [true, "this email address already exist"],
        lowecase: true,
        validate:[validator.isEmail,'Please provide a valid email address'],

    },
    picture:{
        type:String,
        default:"https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    status:{
        type:String,
        default:"This is default status of textmate",
    },
    password:{
        type:String,
        required:[true, "Please provide your password"],
        minLength:[6,'Please make sure your password is 6 characters long'],
        maxLength:[
            128,
            "Please make sure your password is less than 128 characters long",
        ],
    },
    },{
        collection:"users",
        timestamps: true,
    }

);

userSchema.pre("save", async function(next){
    try{
        if(this.isNew){
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(this.password, salt);
            this.password = hashPassword;
        }
        next();
    } catch(error){
        next(error)
    }
})
const UserModel = mongoose.models.UserModel || mongoose.model("UserModel",userSchema);
export default UserModel;