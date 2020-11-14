import React from "react";
import Axis from "./Axis";
import * as d3Scale from "d3-scale";

const circles = [
  112,
  81,
  29,
  30,
  47,
  35,
  30,
  14,
  15,
  9,
  12,
  37,
  17,
  13,
  26,
  35,
  8,
  23,
  36,
  23,
  18,
  98,
  78,
  26,
];

const secondCircles = [
  75,
  72,
  64,
  51,
  46,
  45,
  36,
  35,
  32,
  28,
  27,
  25,
  25,
  22,
  21,
  20,
  17,
  16,
  15,
  10,
];

const data = [];

const BoxPlot = ({ width = 600, domain = [0, 120], range = [10, 590] }) => {
  const xScale = d3Scale.scaleLinear().domain(domain).range(range);
  return (
    <div>
      <svg height={200} width={width}>
        <rect height={50} width={range[1]} fill="lavender" />
        {circles.map((data: any) => {
          return <circle cx={xScale(data)} cy={25} r={4} fill="black" />;
        })}
        <g transform={`translate(${[0, 50].join(",")})`}>
          <Axis domain={domain} range={range} />
        </g>
      </svg>
    </div>
  );
};

export default BoxPlot;
