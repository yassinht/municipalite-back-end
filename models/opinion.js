const mongoose=require('mongoose')
const OpinionSchema = new mongoose.Schema({
    opinion:{type:String,required:true},
    citoyen:{type:mongoose.Types.ObjectId,ref:'Citoyen'},});
const Opinion=mongoose.model('Opinion',OpinionSchema);
module.exports={Opinion};