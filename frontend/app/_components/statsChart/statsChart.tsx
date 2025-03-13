'use client';

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../shadcn/chart/chart";
import { Card, CardBody, CardHeader } from "@heroui/react";

const chartConfig = {
  score: {
    label: 'Score',
    color: '#2563eb'
  },
} satisfies ChartConfig;

type StatsChartType = {
  stats: StatsData,
  className?: string
};

export default function StatsChart({
  stats,
  className = ''
}: StatsChartType) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-col items-start">
        <h3 className="font-bold text-lg">Score</h3>
        <p className="text-black/60 text-small">Showing given scores for your books.</p>
      </CardHeader>
      
      <CardBody>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px]">
          <AreaChart
            accessibilityLayer
            data={stats.scores}
            margin={{
              left: 12,
              right: 12
            }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="score"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Area
              dataKey="count"
              type="natural"
              fill="#3b82f6"
              fillOpacity={0.4}
              stroke="#1e40af"
            />
          </AreaChart>
        </ChartContainer>
      </CardBody>
    </Card>
  );
}