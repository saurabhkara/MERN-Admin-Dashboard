import OverallStat from "../model/OverallStat.js"
export const getSales = async(req, res)=>{
    try {
        const overallStatData = await OverallStat.find();
        
        if(!overallStatData){
            return res.status(404).json({message:'Unable to access data'});
        }

        return res.status(200).json(overallStatData[0]);

    } catch (error) {
        return res.status(404).json({message:error.message})
    }
}