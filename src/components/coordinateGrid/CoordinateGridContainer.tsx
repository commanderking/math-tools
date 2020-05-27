import React, { useRef, useEffect } from "react";
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
  gridHeight = 500,
  gridWidth = 500,
  xDomain = [-10, 10],
  xTicks = 20,
  yDomain = [-10, 10],
  yTicks = 20,
}: Props) => {
  const ref: any = useRef();

  const svgDimensions = {
    width: 10,
    height: 10,
  };

  const padding = 10;

  useEffect(() => {
    const grid = d3.select(ref.current);
    const xScale = d3
      .scaleLinear()
      .domain(xDomain)
      .range([padding, gridWidth - padding]);

    const yScale = d3
      .scaleLinear()
      .domain(yDomain)
      .range([gridHeight - padding, padding]);

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

    function handleMouseOver() {
      // Use D3 to select element, change color and size
      // @ts-ignore
      d3.select(this).attr({
        fill: "orange",
      });
    }

    const renderIconData = (iconData: any) =>
      grid
        .selectAll(".svg") // plot icon at each location
        .data(iconData)
        .enter()
        .append("svg:image")
        .attr("x", function (d: any) {
          return xScale(d.x) - svgDimensions.width / 2;
        })
        .attr("y", function (d: any) {
          return yScale(d.y) - svgDimensions.height / 2;
        })
        .attr("width", svgDimensions.width)
        .attr("height", svgDimensions.height)
        .attr("xlink:href", homeIcon)
        .attr("fill", "orange")
        .on("mouseover", handleMouseOver);

    renderIconData(data);

    function handleCoordinateClick(d: any) {
      const newData = [...data, d];
      renderIconData(newData);
    }

    const coordinates = createCoordinates(xDomain, yDomain);

    grid
      .selectAll("circle")
      .data(coordinates)
      .enter()
      .append("circle")
      .attr("cx", function (d: any) {
        return xScale(d.x);
      })
      .attr("cy", function (d: any) {
        return yScale(d.y);
      })
      .attr("r", 5)
      .attr("fill", "transparent")
      .on("mouseover", handleCoordinateMouseover)
      .on("mouseout", handleCoordinateMouseout)
      .on("click", handleCoordinateClick);
  }, []);

  return (
    <svg style={{ width: "500px", height: "500px" }}>
      <g id={id} ref={ref}></g>
    </svg>
  );
};

export default CoordinateGridContainer;
