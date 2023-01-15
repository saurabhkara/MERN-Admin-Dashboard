import React from 'react';
import { Box, useTheme } from '@mui/system';
import { useGetCustomersQuery } from 'state/api';   
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';

export default function Customers() {
    const theme = useTheme();
    const { data, isLoading} = useGetCustomersQuery();
    const columns =[
        {
            field:'_id',
            headerName:'ID',
            flex:1
        },
        {
            field:'name',
            headerName:'Name',
            flex:0.5
        },
        {
            field:'email',
            headerName:'Email',
            flex:0.7
        },
        {
            field:'phoneNumber',
            headerName:'Phone Number',
            flex:0.6,
            renderCell:(params)=>{
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/,"($1)($2)-($3)")
            }
        },
        {
            field:'country',
            headerName:"Country",
            flex:0.5,
        },
        {
            field:'occupation',
            headerName:"Occupation",
            flex:0.5,
        },
        {
            field:'role',
            headerName:"Role",
            flex:0.5,
        },
        
    ]
  return (
    <Box  m="1.5rem 2.5rem">
        <Header title={'CUSTOMERS'} subTitle='List of Customers'/>
        <Box mt='40px' height={'70vh'} sx={{
            "& .MuiBox-root":{
                border:"none"
            },
            "& .MuiDataGrid-cell":{
                border:"none"
            },
            "& .MuiDataGrid-columnHeaders":{
                backgroundColor:theme.palette.background.alt,
                color:theme.palette.secondary[100],
                borderBottom:"none"
            },
            "& .MuiDataGrid-virtualScroller":{
                backgroundColor:theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer":{
                backgroundColor:theme.palette.background.alt,
                color:theme.palette.secondary[100],
                border:"none"
            }
        }}>
            <DataGrid 
                loading={isLoading || !data}
                getRowId={(row)=>row._id}
                rows={data || []}
                columns={columns}
            />
        </Box>

    </Box>
  )
}
