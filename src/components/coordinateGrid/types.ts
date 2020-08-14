export type Coordinate = {
  x: number;
  y: number;
};

export type PreplacedIcon = {
  iconImage: string;
  coordinates: Coordinate[];
  iconSize: number;
};
