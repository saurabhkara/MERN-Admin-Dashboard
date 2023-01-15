import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";


const Product =({_id, name, price, description,rating ,category, supply, stat})=>{
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return(<Card 
    sx={{
      backgroundImage:"none",
      backgroundColor:theme.palette.background.alt,
      borderRadius:"0.55rem"
    }}
  >
    <CardContent>
        <Typography sx={{fontSize:14,color:theme.palette.secondary[700]}} gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component={'div'} >{name}</Typography>
        <Typography sx={{mb:"1.5rem", color:theme.palette.secondary[400]}}>${Number(price).toFixed(2)}</Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2" >{description}</Typography>
        
    </CardContent>
    <CardActions sx={{display:'flex', flexDirection:'column'}}>
      <Button variant="primary" size='small' onClick={()=>setIsExpanded(!isExpanded)}>See more</Button>
      <Collapse in={isExpanded}  timeout='auto' unmountOnExit sx={{color:theme.palette.neutral[300]}}>
        <CardContent>
          <Typography>id:{_id}</Typography>
          <Typography>Supply Left:{supply}</Typography>
          <Typography>Yearly Sales this year:{stat.yearlySalesTotal}</Typography>
          <Typography>Yearly sold units this year:{stat.yearlyTotalSoldUnits}</Typography>
        </CardContent>
      </Collapse>
    </CardActions>
  </Card>)
}

export default function Products() {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:800px)");
  console.log(isNonMobile);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"PRODUCTS"} subTitle="See your lists of products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display={'grid'}
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="20px"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {
            data.map(({_id, name, price, description, rating, stat,category, supply})=>{
              return(<Product  
                  key={_id}
                  _id={_id}
                  name={name}
                  price={price}
                  description={description}
                  rating={rating}
                  stat={stat[0]}
                  category={category}
                  supply={supply}
              />)
            })
          }
        </Box>
      ) : (
        <>Loading ...</>
      )}
    </Box>
  );
}
