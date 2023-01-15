import React, { useMemo, useState } from "react";
import Header from "components/Header";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { ResponsiveLine } from "@nivo/line";

export default function Daily() {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-02-28"));
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  const [formattedData] = useMemo(() => {
    if (!data) {
      return [[]];
    }
    const { dailyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };
    let curSales = 0;
    let curUnits = 0;

    dailyData.map(({ totalSales, totalUnits, date }) => {
      let dateFormatted = new Date(date);
      const splitDate = date.substring(date.indexOf("-") + 1);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        curSales = curSales + totalSales;
        curUnits = curUnits + totalUnits;
        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });
    return [[totalSalesLine, totalUnitsLine]];
  }, [data,startDate, endDate]);

  return (
    <Box m="1.5rem 2rem">
      <Header title="DAILY SALES" subTitle={"Chart of daily sales"} />
      <Box height={'70vh'}>
      <Box display="flex" justifyContent={"flex-end"}>
        <Box>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
        <Box>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </Box>
        </Box>
          {
            data ? <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          /> : (<>Loading...</>)
          }
      </Box>
    </Box>
  );
}
