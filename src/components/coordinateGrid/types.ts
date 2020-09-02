export type Coordinate = {
  x: number;
  y: number;
  label?: string;
};

export type PreplacedIcon = {
  iconImage: string;
  coordinates: Coordinate[];
  iconSize: number;
};
