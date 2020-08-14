import React, { useState } from "react";
import { PreplacedIcon, Coordinate } from "./types";
import * as d3Scale from "d3-scale";
// For cell tower svg - Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

type Props = {
  id: string;
  gridHeight: number;
  gridWidth: number;
  preplacedIcons?: PreplacedIcon[];
  xDomain?: [number, number];
  xTicksNumber?: number;
  yDomain?: [number, number];
  yTicksNumber?: number;
  addableIcon?: AddableIcon;
  showXLabels?: boolean;
  showYLabels?: boolean;
};

type AddableIcon = {
  iconImage: string;
  iconSize: number;
  maxIcons?: number;
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

const CoordinateGrid = ({
  id,
  preplacedIcons,
  gridHeight,
  gridWidth,
  xDomain = [-10, 10],
  xTicksNumber = 20,
  yDomain = [-10, 10],
  yTicksNumber = 20,
  addableIcon,
  showXLabels = true,
  showYLabels = true,
}: Props) => {
  const [addedIcons, setAddedIcons] = useState<
    { x: number; y: number; key: string }[]
  >([]);

  const padding = 10;

  const xScale = d3Scale
    .scaleLinear()
    .domain(xDomain)
    .range([padding, gridWidth - padding]);

  const yScale = d3Scale
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

  const hasAddedMaxIcons =
    addableIcon &&
    addableIcon.maxIcons &&
    addedIcons.length >= addableIcon.maxIcons;

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
              {showXLabels && (
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
              )}
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
              {showYLabels && (
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
              )}
            </g>
          );
        })}
        {addableIcon &&
          !hasAddedMaxIcons &&
          coordinates.map((coordinate: Coordinate) => {
            const { x, y } = coordinate;
            return (
              <circle
                key={getCoordinateKey(coordinate)}
                cx={xScale(x)}
                cy={yScale(y)}
                r={7.5}
                fill="transparent"
                onMouseOver={fillCircle}
                onMouseOut={removeCircle}
                onClick={() => {
                  setAddedIcons([...addedIcons, { x, y, key: `${x}-${y}` }]);
                }}
              />
            );
          })}
        {preplacedIcons &&
          preplacedIcons.map((preplacedIcon: PreplacedIcon) => {
            const { coordinates, iconImage, iconSize } = preplacedIcon;
            return coordinates.map((coordinate: Coordinate) => {
              const { x, y } = coordinate;
              return (
                <image
                  href={iconImage}
                  x={xScale(x) - iconSize / 2}
                  y={yScale(y) - iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                  xlinkHref={iconImage}
                />
              );
            });
          })}
        {addableIcon &&
          addedIcons.map((coordinate: any) => {
            const { x, y } = coordinate;
            const { iconSize, iconImage } = addableIcon;
            return (
              <image
                href={iconImage}
                x={xScale(x) - iconSize / 2}
                y={yScale(y) - iconSize / 2}
                width={iconSize}
                height={iconSize}
                style={{ fill: "blue" }}
                xlinkHref={iconImage}
                onClick={() => {
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

export { CoordinateGrid };
