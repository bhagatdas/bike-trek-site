const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title :{
        type:String,
        trim :true,
        required : true,
        maxlenght : 100,
        text:true,
    },
    slug :{
        type:String,
        unique:true,
        lowercase:true,
        index:true,
    },
    description :{
        type:String,
        trim :true,
        required : true,
        maxlenght : 20000,
        text:true,
    },
    cost :{
        type:Number,
        trim :true,
        required : true,
        maxlenght : 32,
    },
    // category :{
    //     type:ObjectId,
    //     ref :"Category",
    //     trim :true,
    //     required : true,
    // },
    // organizerId :{
    //     type:ObjectId,
    //     ref :"User",
    //     trim :true,
    //     required : true,
    // },
    // totalSlot :Number,
    // availableSlot :{
    //     type:Number,
    //     default:0,
    // },
    // images:{
    //     type:Array
    // },
    // iternity:{
    //     type:Array
    // },
    // location :{
    //     type:String,
    //     trim :true,
    //     required : true,
    //     maxlenght : 30,
    //     text:true,
    // },
    // duration :Number,
    // difficulty:{
    //     type:String,
    //     enum :["easy","moderate","hard","extremely hard"],
    // },
    // season:{
    //     type:String,
    //     enum :["january","febuary","march","april","may","june","july","august","september","october","november","december"],
    // },
    // tags:{
    //     type:Array,
    // }
    // date:{
    //     type:Date,
    //     trim :true,
    //     required : true,
    //     maxlenght : 10,
    // }, 
    // rating : [
    //     {
    //         star:Number,
    //         postedBy :{ type :ObjectId , ref:"User"}
    //     }
    // ],
},  { timestamps: true }
);

module.exports = mongoose.model("Post",postSchema);