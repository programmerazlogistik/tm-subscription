"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTranslation } from "@/hooks/use-translation";

import { formatNumberShorthand } from "@/lib/utils/formatNumberShorthand";

const CustomTooltip = ({
  active,
  payload,
  tooltipLabelKey = "tooltipDateLabel",
  valueKey = "income",
  labelText = "Pendapatan",
}) => {
  const { t } = useTranslation();

  if (active && payload && payload.length) {
    // Get the tooltip label using the configurable key
    const tooltipLabel = payload[0].payload[tooltipLabelKey];

    return (
      <div className="min-w-[150px] rounded-md bg-white p-3 shadow-muat">
        {/* Date Section - Shows the tooltip label */}
        <div className="pb-2">
          <p className="text-xxs font-semibold text-neutral-900">
            {tooltipLabel}
          </p>
        </div>
        <hr className="absolute -ml-3 w-full" />
        {/* Content Section */}
        <div className="pt-2">
          <div className="flex items-center justify-between gap-x-2">
            <p className="text-xxs text-neutral-600">{labelText}:</p>
            <p className="text-xxs font-semibold text-neutral-900">
              {`Rp${new Intl.NumberFormat("id-ID").format(payload[0].value)}`}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const LineChart = ({
  data,
  width = "100%",
  height = 182,
  xAxisKey = "dateLabel",
  yAxisKey = "income",
  tooltipLabelKey = "tooltipDateLabel",
  tooltipValueLabel = "Pendapatan",
}) => {
  const yAxisFormatter = (value) => {
    if (value === 0) return "";
    return `${formatNumberShorthand(value)}`;
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey={xAxisKey} // Configurable X-axis key
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#7B7B7B", fontWeight: "500" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={yAxisFormatter}
          tick={{ fontSize: 12, fill: "#7B7B7B", fontWeight: "500" }}
        />
        <Area
          type="linear"
          dataKey={yAxisKey} // Configurable Y-axis key
          stroke="none"
          fill="#FFFBEB"
          fillOpacity={1}
          activeDot={false}
        />
        <CartesianGrid vertical={false} style={{ stroke: "#F1F1F1" }} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={
            <CustomTooltip
              tooltipLabelKey={tooltipLabelKey}
              valueKey={yAxisKey}
              labelText={tooltipValueLabel}
            />
          }
        />
        <Line
          type="linear"
          dataKey={yAxisKey} // Configurable Y-axis key
          stroke="#FFC217"
          strokeWidth={3}
          dot={false}
          activeDot={{
            r: 6,
            fill: "#FFC217",
            stroke: "none",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
