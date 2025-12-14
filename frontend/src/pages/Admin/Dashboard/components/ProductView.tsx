import { useState, useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";
import { useToast } from "../../../../context/useToast";
import {
  type DayData,
  getDashboardProductViewsLast7Days,
} from "../../../../services/fakeAdminServices";

const ProductViewWith7DayColumnChart = ({
  title = "Product Views",
  height = 300,
}) => {
  const [data, setData] = useState<DayData[]>([]);
  const { showToast } = useToast();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getDashboardProductViewsLast7Days();
        setData(res);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "Something went wrong";
        showToast(message, "error");
      }
    };

    fetchProducts();
  }, []);
  const total = data.reduce((s, d) => s + d.views, 0);
  const avg = Math.round(total / data.length);
  const maxViews = Math.max(...data.map((d) => d.views));

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: "#F2F1FA",
        borderRadius: "20px",
        padding: 2,
        pt: 4,
        minWidth: 390,
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 700,
          mb: 1,
          ml: 2,
          textAlign: "left",
        }}
      >
        {title}
      </Typography>

      <Box sx={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            barCategoryGap="25%"
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="95%" stopOpacity={0.15} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#ececec" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              padding={{ left: 6, right: 6 }}
            />
            <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              wrapperStyle={{
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
              formatter={(value: number) => `${value.toLocaleString()} views`}
            />

            <Bar
              dataKey="views"
              fill="url(#colorViews)"
              radius={[6, 6, 0, 0]}
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.views === maxViews ? "#4ECD6A" : "#CCC9C8"}
                />
              ))}
              <LabelList dataKey="views" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 1, px: 1 }}
      >
        <Typography variant="caption" sx={{ color: "#666" }}>
          Total (7 days): {total.toLocaleString()}
        </Typography>
        <Typography variant="caption" sx={{ color: "#666" }}>
          Avg / day: {avg.toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProductViewWith7DayColumnChart;
