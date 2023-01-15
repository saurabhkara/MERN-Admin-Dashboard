import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { clientRoutes,sellsRoutes,generalRoutes,managementRoutes} from './routes/index.js';
import { PORT_NUMBER, MONGO_URL} from './config/index.js';

//DATA IMPORT 
import User from './model/User.js';
import Product from './model/Product.js';
import ProductStat from './model/ProductStat.js';
import Transaction from './model/Transaction.js';
import OverallStat from './model/OverallStat.js';
import AffilateStat from './model/AffilateStat.js';
import {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat} from './data/index.js';





//CONFIGURATION
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


//ROUTES
app.use('/client',clientRoutes);
app.use('/general',generalRoutes);
app.use('/sells',sellsRoutes);
app.use('/management',managementRoutes);


//MONGOOSE SETUP
const PORT =  PORT_NUMBER || 9000;
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server running on ${PORT}`));
     // User.insertMany(dataUser);
    //  Product.insertMany(dataProduct);
    //  ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffilateStat.insertMany(dataAffiliateStat);

}).catch((err)=>{
    console.log(`Error Occured in DB Connection ${err}`);
})
