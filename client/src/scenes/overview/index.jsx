import React, {useState} from 'react';
import { Box, MenuItem , InputLabel ,Select, FormControl} from '@mui/material';
import Header from 'components/Header';
import OverviewChart from "components/OverviewChart"


export default function Overview() {
    const [view, setView] = useState("units");
  return (
    <Box m="1.5rem 2rem">
        <Header title="OVERVIEW" subTitle="Overview of general and profits" />
        <Box height="75vh">
            <FormControl sx={{mt:"1rem"}} >
                <InputLabel>View</InputLabel>
                <Select value={view} label="View" onChange={(e)=>setView(e.target.value)} >
                    <MenuItem value="sales" >Sales</MenuItem>
                    <MenuItem value="units" >Units</MenuItem>
                </Select>
            </FormControl>
            <OverviewChart view={view}/>
        </Box>
    </Box>
  )
}
