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
  iconImage: string;
  iconSize: number;
  maxIcons?: number;

  /*
   * Override internal tracking of coordinates
   */
  coordinates?: Coordinate[];
  onAddIcon?: (coordinate: Coordinate) => void;
  onAddedIconClick?: (coordinate: Coordinate) => void;
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

export type DefaultIconConfig = {
  size: number;
  image?: String;
};
