import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import homeIcon from "../../home-icon.svg";

type Props = {
  id: string;
  data?: Object[];
  gridHeight?: number;
  gridWidth?: number;
  xDomain?: [number, number];
  xTicks?: number;
  yDomain?: [number, number];
  yTicks?: number;
};

const createCoordinates = (xDomain: any, yDomain: any) => {
  let xCoordinates = [];
  for (let i = xDomain[0]; i <= xDomain[1]; i++) {
    xCoordinates.push(i);
  }

  let yCoordinates: any = [];
  for (let i = yDomain[0]; i <= yDomain[1]; i++) {
    yCoordinates.push(i);
  }
  let coordinates: any = [];
  xCoordinates.forEach((x: any) => {
    yCoordinates.forEach((y: any) => {
      coordinates.push({ x, y });
    });
  });

  return coordinates;
};

function handleCoordinateMouseover(d: any) {
  // Use D3 to select element, change color and size
  // @ts-ignore
  d3.select(this).attr("fill", "orange");
}

function handleCoordinateMouseout(d: any) {
  //@ts-ignore
  d3.select(this).attr("fill", "transparent");
}

const CoordinateGridContainer = ({
  id,
  data = [
    { x: 1, y: 2 },
    { x: 5, y: 9 },
    { x: -5, y: -2 },
    { x: -3, y: -4 },
  ],
  gridHeight = 650,
  gridWidth = 650,
  xDomain = [-10, 10],
  xTicks = 20,
  yDomain = [-10, 10],
  yTicks = 20,
}: Props) => {
  const ref: any = useRef();

  const svgDimensions = {
    width: 20,
    height: 20,
  };

  const padding = 10;

  const xScale = d3
    .scaleLinear()
    .domain(xDomain)
    .range([padding, gridWidth - padding]);

  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range([gridHeight - padding, padding]);

  useEffect(() => {
    const grid = d3.select(ref.current);

    // Define the axes
    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);

    // Plot the x-axis
    const xAxisPlot = grid
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + gridHeight / 2 + ")")
      .call(xAxis.ticks(xTicks));

    // Plot the y-axis
    const yAxisPlot = grid
      .append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(" + gridWidth / 2 + ",0)")
      .call(yAxis.ticks(yTicks));

    // Add the x-axis lines/ticks
    xAxisPlot
      .selectAll(".tick line")
      .attr("stroke", "silver")
      .attr("y1", ((gridWidth - 2 * padding) / 2) * -1)
      .attr("y2", ((gridWidth - 2 * padding) / 2) * 1);

    // Add the y-axis lines/ticks
    yAxisPlot
      .selectAll(".tick line")
      .attr("stroke", "silver")
      .attr("x1", ((gridWidth - 2 * padding) / 2) * -1)
      .attr("x2", ((gridWidth - 2 * padding) / 2) * 1);
  }, []);

  const coordinates = createCoordinates(xDomain, yDomain);

  const getCoordinateKey = (coordinate: { x: number; y: number }) => {
    return `${coordinate.x}-${coordinate.y}`;
  };

  const fillCircle = (e: any) => {
    e.target.style.fill = "orange";
  };

  const removeCircle = (e: any) => {
    e.target.style.fill = "transparent";
  };
  return (
    <svg width={gridWidth} height={gridHeight}>
      <g id={id} ref={ref}>
        {coordinates.map((coordinate: any) => {
          return (
            <circle
              key={getCoordinateKey(coordinate)}
              cx={xScale(coordinate.x)}
              cy={yScale(coordinate.y)}
              r={10}
              fill="transparent"
              onMouseOver={fillCircle}
              onMouseOut={removeCircle}
            ></circle>
          );
        })}
        {data.map((coordinate: any) => {
          return (
            <image
              href={homeIcon}
              x={xScale(coordinate.x) - svgDimensions.width / 2}
              y={yScale(coordinate.y) - svgDimensions.height / 2}
              width={svgDimensions.width}
              height={svgDimensions.height}
              xlinkHref={homeIcon}
            ></image>
          );
        })}
      </g>
    </svg>
  );
};

export default CoordinateGridContainer;
