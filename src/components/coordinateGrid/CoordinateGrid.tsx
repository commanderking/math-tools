import React, { useState } from "react";
import { Coordinate, AddableIcon, PlacedIcon } from "./types";
import * as d3Scale from "d3-scale";
import { createCoordinates, getCoordinateKey, noop } from "./utils";
// For cell tower svg - Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

type Props = {
  id: string;
  gridHeight: number;
  gridWidth: number;
  xDomain?: [number, number];
  xTicksNumber?: number;
  yDomain?: [number, number];
  yTicksNumber?: number;
  /**
   * Object with props that affect the icon that's currently addable
   * including attributes of the icon (size, image, max), but also behavior such as event handlers for adding and clicking the added icon. Can also override
   * internal control of which icons have been added by providing custom coordinates
   */
  addableIcon?: AddableIcon;
  showXLabels?: boolean;
  showYLabels?: boolean;
  /*
   * Set of initial icons that will be placed on render
   */
  initialIcons?: PlacedIcon[];
  /*
   * Only use if you as a developer want complete control over the coordinates placed
   * Overrides internal state in terms of which icons to show
   */
  activeIcons?: PlacedIcon[];
  onIconClick?: (icon: PlacedIcon, allIcons: PlacedIcon[]) => void;
};

const CoordinateGrid = ({
  id,
  gridHeight,
  gridWidth,
  xDomain = [-10, 10],
  xTicksNumber = 20,
  yDomain = [-10, 10],
  yTicksNumber = 20,
  showXLabels = true,
  showYLabels = true,
  initialIcons = [],
  addableIcon,
  activeIcons,
  onIconClick = () => {},
}: Props) => {
  const { onAddIcon = noop } = addableIcon || {};
  const [addedIconsInternal, setAddedIcons] = useState<PlacedIcon[]>(
    initialIcons
  );

  const addedIcons = activeIcons || addedIconsInternal;

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

  const clickableCoordinates = createCoordinates(xDomain, yDomain);

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
          clickableCoordinates.map((coordinate: Coordinate) => {
            const { x, y } = coordinate;
            const currentIcon = {
              ...addableIcon,
              x,
              y,
              key: `${x}-${y}`,
            };
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
                  if (!activeIcons) {
                    setAddedIcons([...addedIconsInternal, currentIcon]);
                  }

                  onAddIcon(currentIcon);
                }}
              />
            );
          })}
        {addedIcons.map((icon: PlacedIcon) => {
          const { x, y, image, size, label } = icon;
          return (
            <React.Fragment>
              <image
                key={`addable-icon-coordinate-${x}-${y}`}
                href={image}
                x={xScale(x) - size / 2}
                y={yScale(y) - size / 2}
                width={size}
                height={size}
                xlinkHref={image}
                onClick={() => {
                  const iconKey = `${x}-${y}`;
                  const updatedAddedIcons = addedIconsInternal.filter(
                    (icon) => icon.key !== iconKey
                  );
                  if (!activeIcons) {
                    setAddedIcons(updatedAddedIcons);
                  }
                  onIconClick(icon, updatedAddedIcons);
                }}
              />
              {label && (
                <text
                  key={`preplaced-icon-label-${x}-${y}`}
                  x={xScale(x) - size}
                  y={yScale(y) - size / 2}
                  fontSize={size}
                >
                  {label}
                </text>
              )}
            </React.Fragment>
          );
        })}
      </g>
    </svg>
  );
};

export { CoordinateGrid };
