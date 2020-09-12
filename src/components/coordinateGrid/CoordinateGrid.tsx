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

  /*
   * Override internal tracking of coordinates
   */
  coordinates?: Coordinate[];
  onAddIcon?: (coordinate: Coordinate) => void;
  onAddedIconClick?: (coordinate: Coordinate) => void;
};

const noop = () => {};

const createCoordinates = (
  xDomain: [number, number],
  yDomain: [number, number]
) => {
  let xCoordinates = [];
  for (let i = xDomain[0]; i <= xDomain[1]; i++) {
    xCoordinates.push(i);
  }

  let yCoordinates: number[] = [];
  for (let i = yDomain[0]; i <= yDomain[1]; i++) {
    yCoordinates.push(i);
  }
  let coordinates: Coordinate[] = [];
  xCoordinates.forEach((x: number) => {
    yCoordinates.forEach((y: number) => {
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
  const {
    coordinates: userControlledAddedCoordinates = undefined,
    onAddIcon = noop,
    onAddedIconClick = noop,
  } = addableIcon || {};
  const [addedIconsInternal, setAddedIcons] = useState<Coordinate[]>([]);

  const addedIconCoordinates =
    userControlledAddedCoordinates || addedIconsInternal;

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

  const initialAvailableCoordinates = createCoordinates(xDomain, yDomain);

  const getCoordinateKey = (coordinate: { x: number; y: number }) => {
    return `${coordinate.x}-${coordinate.y}`;
  };

  const fillCircle = (e: any) => {
    e.target.style.fill = "orange";
  };

  const removeCircle = (e: any) => {
    e.target.style.fill = "transparent";
  };

  const halfHeight = (gridHeight - 2 * padding) / 2;
  const halfWidth = (gridWidth - 2 * padding) / 2;

  const hasAddedMaxIcons =
    addableIcon &&
    addableIcon.maxIcons &&
    addedIconCoordinates.length >= addableIcon.maxIcons;

  return (
    <svg width={gridWidth} height={gridHeight}>
      <g id={id}>
        {xTicks.map(({ value, xOffset }) => {
          return (
            <g
              key={value}
              transform={`translate(${xOffset}, ${gridHeight / 2})`}
            >
              <line y1={-halfHeight} y2={halfHeight} stroke="silver" />
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
              <line x1={-halfWidth} x2={halfWidth} stroke="silver" />
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
          initialAvailableCoordinates.map((coordinate: Coordinate) => {
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
                  const coordinate = { x, y, key: `${x}-${y}` };
                  if (!userControlledAddedCoordinates) {
                    setAddedIcons([
                      ...addedIconsInternal,
                      { x, y, key: `${x}-${y}` },
                    ]);
                  }

                  onAddIcon(coordinate);
                }}
              />
            );
          })}
        {preplacedIcons &&
          preplacedIcons.map((preplacedIcon: PreplacedIcon) => {
            const { coordinates, iconImage, iconSize } = preplacedIcon;
            return coordinates.map((coordinate: Coordinate) => {
              const { x, y, label } = coordinate;
              return (
                <React.Fragment>
                  <image
                    key={`preplaced-icon-${x}-${y}`}
                    href={iconImage}
                    x={xScale(x) - iconSize / 2}
                    y={yScale(y) - iconSize / 2}
                    width={iconSize}
                    height={iconSize}
                    xlinkHref={iconImage}
                  />
                  {label && (
                    <text
                      key={`preplaced-icon-label-${x}-${y}`}
                      x={xScale(x) - iconSize}
                      y={yScale(y) - iconSize / 2}
                      fontSize={iconSize}
                    >
                      {label}
                    </text>
                  )}
                </React.Fragment>
              );
            });
          })}
        {addableIcon &&
          addedIconCoordinates.map((coordinate: Coordinate) => {
            const { x, y } = coordinate;
            const { iconSize, iconImage } = addableIcon;
            return (
              <image
                key={`addable-icon-coordinate-${x}-${y}`}
                href={iconImage}
                x={xScale(x) - iconSize / 2}
                y={yScale(y) - iconSize / 2}
                width={iconSize}
                height={iconSize}
                xlinkHref={iconImage}
                onClick={() => {
                  const iconKey = `${x}-${y}`;

                  if (!userControlledAddedCoordinates) {
                    const updatedAddedIcons = addedIconsInternal.filter(
                      (icon) => icon.key !== iconKey
                    );
                    setAddedIcons(updatedAddedIcons);
                  }
                  onAddedIconClick({ ...coordinate, key: iconKey });
                }}
              />
            );
          })}
      </g>
    </svg>
  );
};

export { CoordinateGrid };
