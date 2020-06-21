import React from "react";
import { CoordinateGrid } from "./CoordinateGrid";
import homeIcon from "../../images/home-icon.svg";
import { withKnobs, number, select } from "@storybook/addon-knobs";
import cellTower from "../../images/cell-tower.svg";
export default {
  component: CoordinateGrid,
  title: "Coordinate Grid",
  decorators: [withKnobs],
};

export const Basic = () => (
  <CoordinateGrid
    id="BasicCoordinateGrid"
    gridHeight={number("gridHeight", 500)}
    gridWidth={number("gridWidth", 500)}
    xTicksNumber={number("Number of X-axis Ticks", 20)}
    yTicksNumber={number("Number of Y-axis Ticks", 20)}
  />
);

export const PreplacedIcons = () => (
  <CoordinateGrid
    id="PreplacedIconsGrid"
    gridHeight={600}
    gridWidth={600}
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
      gridHeight={600}
      gridWidth={600}
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
