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
  onAddIcon?: (icon: PlacedIcon) => void;
  onAddedIconClick?: (icon: PlacedIcon) => void;
};

type CurrentIcon = {
  image: string;
  size: number;
};

export type PlacedIcon = {
  x: number;
  y: number;
  label?: string;
  key?: string;
  image: string;
  size: number;
  canRemove?: boolean;
  onClick?: () => void;
};
