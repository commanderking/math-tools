import { Coordinate } from "./types";

export const createCoordinates = (
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

export const getCoordinateKey = (coordinate: { x: number; y: number }) => {
  return `${coordinate.x}-${coordinate.y}`;
};

export const noop = () => {};
