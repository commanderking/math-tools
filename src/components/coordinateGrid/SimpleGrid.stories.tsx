import React from "react";
import { SimpleGrid } from "./SimpleGrid";
import homeIcon from "../../images/home-icon.svg";
import { withKnobs, number, select, boolean } from "@storybook/addon-knobs";
export default {
  component: SimpleGrid,
  title: "Simple Grid",
  decorators: [withKnobs],
};

export const Basic = () => {
  return (
    <SimpleGrid
      gridHeight={number("Grid Height", 300)}
      gridWidth={number("Grid Width", 300)}
      preplacedIcons={[
        {
          iconImage: homeIcon,
          iconSize: number("iconSize", 15),
          coordinates: [
            { x: 0, y: 0 },
            { x: 2, y: 2 },
            { x: 3, y: 4 },
          ],
        },
      ]}
      dimensions={[number("X Dimension", 5), number("Y Dimension", 5)]}
    />
  );
};
