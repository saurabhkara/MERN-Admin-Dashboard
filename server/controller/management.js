import mongoose from "mongoose";
import User from "../model/User.js";
import Transaction from '../model/Transaction.js'
export const getAdmins = async (req, res)=>{
    try {
       const admins = await User.find({role:'admin'}).select('-password');
       console.log(admins);
       return res.status(200).json(admins);
    } catch (error) {
      return res.status(404).json({message:error.message});  
    }
}

export const getUserPerformance = async (req, res)=>{
  try {
      const id = req.params.id;
      const userWithStats = await User.aggregate([
        {$match: { _id:new mongoose.Types.ObjectId(id)}},
        {
          $lookup:{
            from:"affilatestats",
            localField:"_id",
            foreignField:"userId",
            as:"affiliateStats"
          }
        },
        {$unwind:"$affiliateStats"}
      ]);

      const salesTransactions = await Promise.all(
        userWithStats[0].affiliateStats.affiliateSales.map((id)=>{
          return Transaction.findById(id);
        })
      )

      const filteredTransaction = salesTransactions.filter((transaction)=>transaction!==null);

      return res.status(200).json({user:userWithStats[0], sales:filteredTransaction});
  } catch (error) {
    return res.status(404).json({message: error.message});
  }
}