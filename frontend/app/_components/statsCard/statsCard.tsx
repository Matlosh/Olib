'use client';

import { Card, CardBody } from "@heroui/react";
import React from "react";

type StatsCardProps = {
  value: string,
  description: string,
  color: 'yellow' | 'green' | 'blue',
  icon: React.ReactNode
};

const colors = {
  'yellow': 'bg-amber-500',
  'green': 'bg-green-500',
  'blue': 'bg-blue-500'
};

export default function StatsCard({
  value,
  description,
  color,
  icon
}: StatsCardProps) {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-row items-center gap-4">
        <div>
          <div className={`w-[40px] h-[40px] ${colors[color]} rounded-full flex items-center justify-center`}>
            {icon}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{value}</h3>
          <p className="text-base text-black/40">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
}