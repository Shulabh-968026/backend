
const User = require("../models/userSchema");

exports.getAllUsers = async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json({
            success:true,
            length:users.length,
            users
        })
    }catch(err){
        res.status(404).json({
            success:false,
            error:err["message"]
        })
    }
}

exports.createUser = async(req,res)=>{
    try{
        const user = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            status:req.body.status
        })
        const saveUser = await user.save();
        res.status(200).json({
            success:true,
            user:saveUser
        })
    }catch(err){
        res.status(404).json({
            success:false,
            error:err["message"]
        })
    }
}

exports.getUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success:true,
            user
        })
    }catch(err){
        res.status(404).json({
            success:false,
            error:err["message"]
        })
    }
}

exports.updateUser = async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{ new:true});
        res.status(200).json({
            success:true,
            user:updatedUser
        })
    }catch(err){
        res.status(404).json({
            success:false,
            error:err["message"]
        })
    }
}


exports.deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:`${req.body.email} is successfully deleted!!`
        })
    }catch(err){
        res.status(404).json({
            success:false,
            error:err["message"]
        })
    }
}