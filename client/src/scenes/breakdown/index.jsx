import React from 'react';
import { Box } from '@mui/system';
import Header from 'components/Header'; 
import BreakdownChart from 'components/BreakdownChart';

export default function Breakdown() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subTitle={'Breakdown sales by category'}/>
      <Box mt="30px" height={'70vh'}>
          <BreakdownChart />
      </Box>
    </Box>
  )
}
 