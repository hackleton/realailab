"use client";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <div className="w-full md:col-span-2 lg:h-[70vh] h-[50vh] m-auto border rounded-lg bg-white pt-4 pb-8">
      <p className="pl-4 pb-2 font-bold text-xl">Overview</p>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Legend
            width={100}
            wrapperStyle={{
              top: -40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "30px",
            }}
          />
          <Tooltip wrapperStyle={{ width: 100 }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="total" fill="#3697db" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
