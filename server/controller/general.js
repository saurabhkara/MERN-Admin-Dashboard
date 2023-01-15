import User from "../model/User.js";
import OverallStats from '../model/OverallStat.js';
import Transaction from '../model/Transaction.js';

export const getUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.find({_id});
    if(user){
        res.status(200).json(user[0]);
    }
  } catch (error) {
    res.status(404).json({message:error.message})
  }
};

export const getDashboardStats = async (req, res)=>{
  try {
    const currentMonth = "November";
    const curentYear ="2021";
    const currentDay = "2021-11-15";

     //Recent Transactions 
    const transaction= await Transaction.find().limit(50).sort({createdOn:-1});
    //Overall Status 
    const overStat = await OverallStats.find({year:curentYear});

    const { totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory } = overStat[0];
    const thisMonthStats = overStat[0].monthlyData.find(({month})=>{
      return month === currentMonth;
    });

    const thisTodayStats = overStat[0].dailyData.find(({date})=>{
      return date === currentDay;
    });

   return res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      thisTodayStats,
      transaction
    })
  } catch (error) {
    return res.status(400).json({message:error.message});
  }
}