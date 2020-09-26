import React, { useState } from "react";
import { CoordinateGrid } from "./CoordinateGrid";
import homeIcon from "../../images/home-icon.svg";
import {
  withKnobs,
  number,
  select,
  boolean,
  text,
} from "@storybook/addon-knobs";
import cellTower from "../../images/cell-tower.svg";
import { PlacedIcon } from "./types";
import { action } from "@storybook/addon-actions";

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

export const PreplacedIcons = () => {
  const size = 15;
  const image = homeIcon;
  return (
    <CoordinateGrid
      id="PreplacedIconsGrid"
      gridHeight={gridDimension}
      gridWidth={gridDimension}
      initialIcons={[
        {
          x: 1,
          y: 2,
          label: text("Coordinate Label", "B"),
          size: 15,
          image,
        },
        { x: 5, y: 9, label: "A", size, image },
        { x: -5, y: -2, label: "C", size, image },
        { x: -3, y: -4, label: "D", size, image },
      ]}
      onIconClick={action("Icon Clicked")}
    />
  );
};

export const AddableIcons = () => {
  return (
    <CoordinateGrid
      id="AddableIcons"
      gridHeight={gridDimension}
      gridWidth={gridDimension}
      addableIcon={{
        image: select(
          "Icon Image",
          { CellTower: cellTower, Home: homeIcon },
          cellTower
        ),
        size: number("Icon Size of Next Added Icon", 20),
        maxIcons: number("Max Number of Icons", 5),
        onAddIcon: action("Added Icon"),
      }}
      onIconClick={action("Icon Clicked")}
    />
  );
};

export const AddableControlledIcons = () => {
  const [activeIcons, setActiveIcons] = useState<PlacedIcon[]>([]);
  const handleAddIcon = (icon: PlacedIcon) => {
    setActiveIcons([...activeIcons, icon]);
  };

  const handleAddableIconClick = (clickedIcon: PlacedIcon) => {
    const newCoordinates = activeIcons.filter(
      (currentIcon: PlacedIcon) =>
        !(currentIcon.x === clickedIcon.x && currentIcon.y === clickedIcon.y)
    );

    setActiveIcons(newCoordinates);
  };

  return (
    <CoordinateGrid
      id="AddableIcons"
      gridHeight={gridDimension}
      gridWidth={gridDimension}
      addableIcon={{
        image: select(
          "Icon Image",
          { CellTower: cellTower, Home: homeIcon },
          cellTower
        ),
        size: number("Icon Size of Next Added Icon", 15),
        maxIcons: number("Max Number of Icons", 5),
        onAddIcon: handleAddIcon,
        label: text("Label", ""),
      }}
      activeIcons={activeIcons}
      onIconClick={handleAddableIconClick}
    />
  );
};
