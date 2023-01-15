import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:String,
    cost:String,
    products:{
        type:[mongoose.Types.ObjectId],
        of:Number,
    }
}, { timestamps:true})

const Transacation = mongoose.model('Transaction',transactionSchema);

export default Transacation;