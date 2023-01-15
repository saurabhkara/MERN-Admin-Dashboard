import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutline,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icons: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutline />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

export default function Sidebar({
  userData,
  isSidebarOpen,
  setIsSidebarOpen,
  drawerWidth,
  isNonMobile,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 1rem 2rem 1.5rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display={"flex"}
                  alignItems="center"
                  gap="0.5rem"
                  justifyContent={"center"}
                >
                  <Typography variant="h4" fontWeight={"bold"}>
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
              <List>
                {navItems.map(({ text, icon }, index) => {
                  if (!icon) {
                    return (
                      <Typography key={index} sx={{ m: "2.25rem 0 1rem 2rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  let lctext = text.toLowerCase();
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lctext}`);
                          setActive(lctext);
                        }}
                        sx={{
                          backgroundColor:
                            active === lctext
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === lctext
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                          pr: "0.5rem",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "0.8rem",

                            color:
                              active === lctext
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ pr: "0.5rem" }} />
                        {active === lctext && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
          <Box bottom="2rem" marginBottom='2rem'>
              <Divider />
              <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem" >
                
                <Box 
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{objectFit:"cover"}}
                />
                  <Box textAlign={"left"}>
                    <Typography fontWeight={"bold"} fontSize="0.9rem" 
                      sx={{color:theme.palette.secondary[100]}}
                    >
                      {userData?.name}
                    </Typography>
                    <Typography  fontSize="0.8rem" 
                      sx={{color:theme.palette.secondary[200]}}
                    >
                      {userData?.occupation}
                    </Typography>
                  </Box>
                  <SettingsOutlined sx={{color:theme.palette.secondary[300], fontSize:'25px'}} />
              </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
