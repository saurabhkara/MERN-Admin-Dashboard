import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";

export default function Layout() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { userId } = useSelector((state) => state.global);
  const { data } = useGetUserQuery(userId);
  
  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      <Sidebar
        userData={data || {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        drawerWidth="250px"
        isNonMobile={isNonMobile}
      />
      <Box flexGrow={1}>
        <Navbar
          userData={data || {}}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}
