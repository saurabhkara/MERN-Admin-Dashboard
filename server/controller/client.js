import Product from "../model/Product.js";
import ProductStats from "../model/ProductStat.js";
import User from "../model/User.js";
import Transaction from "../model/Transaction.js";
import getCountryIso3 from 'country-iso-2-to-3';

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStats.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    if (!customers) {
      return res.status(404).json({ message: "Unable to fetch data" });
    }
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    //sort should look like this { "field" :"userId" , "sort" :"desc"}
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;
    //formatted sort should be look like { userId:- 1}
    const generateSort= ()=>{
        const sortParsed = JSON.parse(sort);
        const formattedSort = {
            [sortParsed.field] : sortParsed.sort === 'asc' ? 1 :-1
        }
        return formattedSort;
    }
    const sortformatted = Boolean(sort) ? generateSort() :{};

    const transactions = await Transaction.find({
      $or :[
        {cost:{$regex:new RegExp(search,"i")}},
        {userId:{$regex:new RegExp(search,"i")}}
      ]
    }).sort(sortformatted).skip(page*pageSize).limit(pageSize);

    console.log("search", search);

    const total = await Transaction.countDocuments({
      name:{$regex:search, $options:"i"},
    });

    return res.status(200).json({transactions,total});
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};


export const getGeography = async (req, res)=>{
  try {
    const user = await User.find();
    const mappedLocation =user.reduce((acc,{country})=>{
      const countryISO3 = getCountryIso3(country);
      if(!acc[countryISO3]){
        acc[countryISO3]=0;
      }
      acc[countryISO3]++;
      return acc;
    },{})

    const formattedLocation = Object.entries(mappedLocation).map(([country,count])=>{
      return {id:country, value:count}
    });

    return res.status(200).json(formattedLocation);

  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}