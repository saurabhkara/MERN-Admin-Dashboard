import { useGetDashboardQuery } from "state/api";
import React from "react";
import FlexBetween from "components/FlexBetween";
import {
  Email,
  PointOfSale,
  Traffic,
  DownloadOutlined,
  PersonAdd,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import Header from "components/Header";
import StatBox from "components/StatBox";
export default function Dashboard() {
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User Id",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 1,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => {
        return `$${Number(params.value).toFixed(2)}`;
      },
    },
  ];
  const { data, isLoading } = useGetDashboardQuery();
  const isNonMediumScreens = useMediaQuery("(min-width:1200px)");
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title={"DASHBOARD"} subTitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gridAutoRow="140px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title={"Total Customer"}
          increase="+14%"
          description={"Since last month"}
          value={data && data.totalCustomers}
          icon={<Email sx={{ color: theme.palette.secondary[300] }} />}
        />
        <StatBox
          title={"Total Sales"}
          increase="+30%"
          description={"Since last month"}
          value={data && data.thisMonthStats.totalSales}
          icon={<PointOfSale sx={{ color: theme.palette.secondary[300] }} />}
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          height={"300px"}
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius={"0.55rem"}
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title={"Monthly Sales"}
          increase="+34%"
          description={"Since last month"}
          value={data && data.thisMonthStats.totalSales}
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300] }} />}
        />
        <StatBox
          title={"Yearly Sales"}
          increase="+30%"
          description={"Since last month"}
          value={data && data.yearlySalesTotal}
          icon={<PointOfSale sx={{ color: theme.palette.secondary[300] }} />}
        />

        {/* next row */}
        <Box
          gridColumn={"span 8"}
          gridRow={"span 3"}
          height="450px"
          sx={{
            "& .MuiBox-root": {
              border: "none",
              borderRadius: "5px",
            },
            "& .MuiDataGrid-cell": {
              border: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              border: "none",
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            columns={columns}
            getRowId={(row) => row._id}
            rows={(data && data.transaction) || []}
          />
        </Box>
        <Box
          gridColumn={"span 4"}
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius={"0.55rem"}
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales by Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Breakdown of real states and information via category for revenue
            made for this year and total sales
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
