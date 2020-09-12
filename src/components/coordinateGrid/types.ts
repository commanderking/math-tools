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
