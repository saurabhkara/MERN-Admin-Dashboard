import mongoose from 'mongoose';

const affilateStatSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, ref:"User"},
    affiliateSales : {
        type:[mongoose.Types.ObjectId],
        ref:"Transaction"
    }
});

const AffilateStat = mongoose.model('AffilateStat',affilateStatSchema);
export default AffilateStat;