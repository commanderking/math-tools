import React, { useState } from "react";
import * as d3 from "d3";
import homeIcon from "../../home-icon.svg";
import cellTower from "../../images/cell-tower.svg";
// For cell tower svg - Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

type Props = {
  id: string;
  data?: Object[];
  gridHeight?: number;
  gridWidth?: number;
  xDomain?: [number, number];
  xTicksNumber?: number;
  yDomain?: [number, number];
  yTicksNumber?: number;
  maxAddedIcons?: number;
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
  xTicksNumber = 20,
  yDomain = [-10, 10],
  yTicksNumber = 20,
  maxAddedIcons = 5,
}: Props) => {
  const [addedIcons, setAddedIcons] = useState([{ x: 1, y: 1, key: "1-1" }]);
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

  const xTicks = xScale.ticks(xTicksNumber).map((value) => ({
    value,
    xOffset: xScale(value),
  }));

  const yTicks = yScale.ticks(yTicksNumber).map((value) => ({
    value,
    yOffset: yScale(value),
  }));

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

  const halfLength = (gridWidth - 2 * padding) / 2;

  const hasAddedMaxIcons = addedIcons.length >= maxAddedIcons;

  return (
    <svg width={gridWidth} height={gridHeight}>
      <g id={id}>
        {xTicks.map(({ value, xOffset }) => {
          return (
            <g
              key={value}
              transform={`translate(${xOffset}, ${gridHeight / 2})`}
            >
              <line y1={-halfLength} y2={halfLength} stroke="silver" />
              <text
                key={value}
                style={{
                  fontSize: "10px",
                  textAnchor: "middle",
                  transform: "translateY(15px)",
                }}
              >
                {value}
              </text>
            </g>
          );
        })}
        {yTicks.map(({ value, yOffset }) => {
          return (
            <g
              key={value}
              transform={`translate( ${gridWidth / 2}, ${yOffset})`}
            >
              <line x1={-halfLength} x2={halfLength} stroke="silver" />
              <text
                key={value}
                style={{
                  fontSize: "10px",
                  textAnchor: "middle",
                  transform: `translateX(-10px)`,
                }}
              >
                {value}
              </text>
            </g>
          );
        })}
        {!hasAddedMaxIcons &&
          coordinates.map((coordinate: any) => {
            const { x, y } = coordinate;
            return (
              <circle
                key={getCoordinateKey(coordinate)}
                cx={xScale(x)}
                cy={yScale(y)}
                r={10}
                fill="transparent"
                onMouseOver={fillCircle}
                onMouseOut={removeCircle}
                onClick={() => {
                  setAddedIcons([...addedIcons, { x, y, key: `${x}-${y}` }]);
                }}
              />
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
            />
          );
        })}
        {addedIcons.map((coordinate: any) => {
          const { x, y } = coordinate;
          return (
            <image
              href={cellTower}
              x={xScale(x) - svgDimensions.width / 2}
              y={yScale(y) - svgDimensions.height / 2}
              width={svgDimensions.width}
              height={svgDimensions.height}
              style={{ fill: "blue" }}
              xlinkHref={cellTower}
              onClick={(test) => {
                const updatedAddedIcons = addedIcons.filter(
                  (icon) => icon.key !== `${x}-${y}`
                );
                setAddedIcons(updatedAddedIcons);
              }}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default CoordinateGridContainer;
