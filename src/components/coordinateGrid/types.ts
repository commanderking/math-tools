export type Coordinate = {
  x: number;
  y: number;
  label?: string;
  key?: string;
};

export type PreplacedIcon = {
  iconImage: string;
  coordinates: Coordinate[];
  iconSize: number;
};

export type AddableIcon = {
  image: string;
  size: number;
  maxIcons?: number;
  label?: string;
  onAddIcon?: (icon: PlacedIcon) => void;
};

export type PlacedIcon = {
  x: number;
  y: number;
  label?: string;
  key?: string;
  image: string;
  size: number;
};
