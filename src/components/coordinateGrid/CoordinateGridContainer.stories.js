import React from "react";
import CoordinateGridContainer from "./CoordinateGridContainer";
import homeIcon from "home-icon.svg";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

export default {
  component: CoordinateGridContainer,
  title: "Coordinate Grid",
  decorators: [withKnobs],
};

export const Basic = () => (
  <CoordinateGridContainer
    id="BasicCoordinateGrid"
    gridHeight={number("gridHeigt", 500)}
    gridWidth={number("gridWidth", 500)}
    xTicksNumber={number("Number of X-axis Ticks", 20)}
    yTicksNumber={number("Number of Y-axis Ticks", 20)}
  />
);

export const PreplacedIcons = () => (
  <CoordinateGridContainer
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
