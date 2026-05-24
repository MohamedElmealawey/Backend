const mongoose=require("mongoose");

const workSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
     images: {
        type: [Object],
        default: []
    },
    url:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true,
        default:"frontend"
    },
    technologies: {
        type: [String],
        default: []
    },
    githubUrl: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['completed', 'in-progress', 'planned'],
        default: 'completed'
    },
    duration: {
        type: String,
        trim: true,
    },
    teamSize: {
        type: Number,
        default: 1
    },
},{timestamps:true})

const workModel=mongoose.model("work",workSchema);

module.exports=workModel;