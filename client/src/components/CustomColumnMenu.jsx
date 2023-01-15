import React from 'react';
import {
    GridColumnMenuContainer,
    GridFilterMenuItem,
    HideGridColMenuItem,
} from "@mui/x-data-grid"

export default function CustomColumnMenu(props) {
    const { open , hideMenu , currentColumn} = props;
  return (
    <GridColumnMenuContainer 
        hideMenu={hideMenu}
        open={open}
        currentColumn={currentColumn}
    >
        <GridFilterMenuItem onClick={hideMenu} column={currentColumn}/>
        <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />

    </GridColumnMenuContainer>
  )
}
