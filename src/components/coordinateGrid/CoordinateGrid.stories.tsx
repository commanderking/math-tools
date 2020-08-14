import React from "react";
import { CoordinateGrid } from "./CoordinateGrid";
import homeIcon from "../../images/home-icon.svg";
import { withKnobs, number, select, boolean } from "@storybook/addon-knobs";
import cellTower from "../../images/cell-tower.svg";
export default {
  component: CoordinateGrid,
  title: "Coordinate Grid",
  decorators: [withKnobs],
};

const gridDimension = 500;

export const Basic = () => (
  <CoordinateGrid
    id="BasicCoordinateGrid"
    gridHeight={number("gridHeight", gridDimension)}
    gridWidth={number("gridWidth", gridDimension)}
    xTicksNumber={number("Number of X-axis Ticks", 20)}
    yTicksNumber={number("Number of Y-axis Ticks", 20)}
    xDomain={[number("xMin", -10), number("xMax", 10)]}
    showXLabels={boolean("Show X Labels", true)}
    showYLabels={boolean("Show Y Labels", true)}
  />
);

export const PreplacedIcons = () => (
  <CoordinateGrid
    id="PreplacedIconsGrid"
    gridHeight={gridDimension}
    gridWidth={gridDimension}
    preplacedIcons={[
      {
        iconImage: homeIcon,
        iconSize: number("iconSize", 15),
        coordinates: [
          {
            x: number("Icon x-coordinate", 1),
            y: number("Icon y-coordinate", 2),
          },
          { x: 5, y: 9 },
          { x: -5, y: -2 },
          { x: -3, y: -4 },
        ],
      },
    ]}
  />
);

export const AddableIcons = () => {
  return (
    <CoordinateGrid
      id="AddableIcons"
      gridHeight={gridDimension}
      gridWidth={gridDimension}
      addableIcon={{
        iconImage: select(
          "Icon Image",
          { CellTower: cellTower, Home: homeIcon },
          cellTower
        ),
        iconSize: number("Icon Size", 20),
        maxIcons: number("Max Number of Icons", 5),
      }}
    />
  );
};
