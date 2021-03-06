import React from "react";
import { SimpleGrid } from "./SimpleGrid";
import homeIcon from "../../images/home-icon.svg";
import { withKnobs, number, text } from "@storybook/addon-knobs";
export default {
  component: SimpleGrid,
  title: "Simple Grid",
  decorators: [withKnobs],
};

export const Basic = () => (
  <SimpleGrid
    gridHeight={number("Grid Height", 300)}
    gridWidth={number("Grid Width", 300)}
    dimensions={[number("X Dimension", 5), number("Y Dimension", 5)]}
  />
);

export const WithIcons = () => {
  const image = homeIcon;
  const size = number("iconSize", 20);
  return (
    <SimpleGrid
      initialIcons={[
        {
          image,
          size,
          x: 0,
          y: 0,
        },
        {
          x: 2,
          y: 2,
          label: text("Coordinate Label - B", "B"),
          image,
          size,
        },
        {
          x: 3,
          y: 4,
          label: text("Coordinate Label - A", "A"),
          image,
          size,
        },
      ]}
    />
  );
};
