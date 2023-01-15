import React from 'react';
import Header from 'components/Header';
import { useGetAdminsQuery } from 'state/api';
import {Box, useTheme}  from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomColumnMenu from 'components/CustomColumnMenu'


export default function Admins() {
    const theme = useTheme();
    const {data, isLoading} = useGetAdminsQuery();
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
        <Header title={'Admins'} subTitle='List of Admins'/>
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
                components={{
                    ColumnMenu: CustomColumnMenu
                }}
            />
        </Box>

    </Box>
  )
}
