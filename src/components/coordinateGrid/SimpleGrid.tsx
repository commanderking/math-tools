import React from "react";
import { CoordinateGrid } from "./CoordinateGrid";
import { PlacedIcon } from "./types";
type Props = {
  gridWidth?: number;
  gridHeight?: number;
  initialIcons?: PlacedIcon[];
  dimensions?: [number, number];
};

const SimpleGrid = ({
  initialIcons = [],
  gridWidth = 300,
  gridHeight = 300,
  dimensions = [5, 5],
}: Props) => {
  const maxXDomain = dimensions[0];
  const maxYDomain = dimensions[1];
  return (
    <CoordinateGrid
      id="SimpleGrid"
      xDomain={[0, maxXDomain]}
      yDomain={[0, maxYDomain]}
      gridHeight={gridHeight}
      gridWidth={gridWidth}
      initialIcons={initialIcons}
      showXLabels={false}
      showYLabels={false}
      xTicksNumber={dimensions[0]}
      yTicksNumber={dimensions[1]}
    />
  );
};

export { SimpleGrid };
