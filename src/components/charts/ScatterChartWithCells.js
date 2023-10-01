import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { x: 90, y: 180, z: 220 },
//   { x: 130, y: 220, z: 300 },
//   { x: 160, y: 350, z: 420 },
//   { x: 115, y: 270, z: 180 },
//   { x: 125, y: 190, z: 240 },
//   { x: 105, y: 240, z: 260 },
//   { x: 180, y: 280, z: 380 },
//   { x: 135, y: 330, z: 460 },
//   { x: 155, y: 400, z: 550 },
//   { x: 95, y: 150, z: 200 },
//   { x: 125, y: 260, z: 320 },
//   { x: 145, y: 320, z: 440 },
//   { x: 170, y: 370, z: 500 },
//   { x: 105, y: 200, z: 280 },
//   { x: 140, y: 220, z: 340 },
//   { x: 165, y: 310, z: 420 },
//   { x: 115, y: 230, z: 280 },
//   { x: 155, y: 360, z: 480 },
//   { x: 175, y: 410, z: 550 },
//   { x: 110, y: 250, z: 320 },
// ];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const ScatterChartWithCells = () => {
  const data = [];

  for (let i = 0; i < 100; i++) {
    const randomX = Math.floor(Math.random() * 600); // Random x value between 0 and 499
    const randomY = Math.floor(Math.random() * 500); // Random y value between 0 and 499
    const randomZ = Math.floor(Math.random() * 500); // Random z value between 0 and 499

    const newObj = { x: randomX, y: randomY, z: randomZ };
    data.push(newObj);
  }
  return (
    <div className="h-[50vh] w-[50%]">
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="A school" data={data} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className="h-10 w-10"
                width={20}
                height={20}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterChartWithCells;
