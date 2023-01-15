import React from 'react';
import Header from 'components/Header';
import { useGetPerformanceQuery } from 'state/api';
import {Box, useTheme}  from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomColumnMenu from 'components/CustomColumnMenu';
import { useSelector } from 'react-redux';
export default function Performance() {
  const {userId} = useSelector(state=>state.global);
  
  const theme = useTheme();
    const {data, isLoading} = useGetPerformanceQuery(userId);
    console.log(data);
    const columns =[
        {
            field:'_id',
            headerName:'ID',
            flex:1
        },
        {
            field:'userId',
            headerName:'User Id',
            flex:1
        },
        {
            field:'createdAt',
            headerName:'Created At',
            flex:0.7
        },
        {
            field:'products',
            headerName:'# of products',
            flex:0.6,
            sortable:false,
            renderCell:(params)=>{
                return params.value.length
            }
        },
        {
            field:'cost',
            headerName:"Cost",
            flex:1,
            renderCell:(params)=>`$${Number(params.value).toFixed(2)}`
        },
        
    ]
  return (
    <Box  m="1.5rem 2.5rem">
        <Header title={'Performance'} subTitle='Track your affiliate sales performance here'/>
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
                rows={(data && data.sales) || []}
                columns={columns}
                components={{
                    ColumnMenu: CustomColumnMenu
                }}
            />
        </Box>

    </Box>)
}
