import React,{useState} from 'react';
import { useGetTransactionsQuery } from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import DataGridToolBar from 'components/DataGridToolBar';
import { Box, useTheme} from '@mui/system';

export default function Transactions() {
    const theme = useTheme();
    const [page, setPage]= useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState('');

    const [searchInput, setSearchInput]=useState('');
    const {data, isLoading} = useGetTransactionsQuery({
        page,
        pageSize,
        sort:JSON.stringify(sort),
        search
    });
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
            flex:1,
        },
        {
            field:'products',
            headerName:'# of Products',
            flex:1,
            sortable:false,
            renderCell:(params)=>params.value.length
        },
        {
            field:'cost',
            headerName:'Cost',
            flex:1,
            renderCell:(params)=>{
                return `$${Number(params.value).toFixed(2)}`
            }
        },
    ]


  return (
    <Box m="1.5rem 2rem">
        <Header title="TRANSACTIONS" subTitle="Entire list of transactions"/>
        <Box height={'70vh'} width={'100%'}
            sx={{
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
            }}
        >
            <DataGrid 
                loading={isLoading || !data}
                getRowId={(row)=>row._id}
                rows={(data && data.transactions) || []}
                columns={columns}
                rowCount={(data && data.total) || 0}
                pagination
                page={page}
                pageSize={pageSize}
                paginationMode="server"
                sortingMode='server'
                onPageChange={(newPage)=>setPageSize(newPage)}
                onPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
                onSortModelChange={(newSortModel)=>setSort(...newSortModel)}
                rowsPerPageOptions={[20,40,60]}
                components={{Toolbar:DataGridToolBar}}
                componentsProps={{
                    toolbar:{
                        searchInput,
                        setSearchInput,
                        setSearch
                    }
                }}
            />
        </Box>
    </Box>
  )
}
