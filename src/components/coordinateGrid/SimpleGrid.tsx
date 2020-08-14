import React from "react";
import { CoordinateGrid } from "./CoordinateGrid";
import { PreplacedIcon } from "./types";
type Props = {
  gridWidth: number;
  gridHeight: number;
  // icon coordinates start at (0,0) and move in the positive direction
  preplacedIcons: PreplacedIcon[];
  dimensions: [number, number];
};

const SimpleGrid = ({
  preplacedIcons,
  gridWidth,
  gridHeight,
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
      preplacedIcons={preplacedIcons}
      showXLabels={false}
      showYLabels={false}
      xTicksNumber={dimensions[0]}
      yTicksNumber={dimensions[1]}
    />
  );
};

export { SimpleGrid };
