import React, { useState } from "react";
import BoxPlot from "./BoxPlot";
import {
  withKnobs,
  number,
  select,
  boolean,
  text,
} from "@storybook/addon-knobs";

export default {
  component: BoxPlot,
  title: "Box Plot",
  decorators: [withKnobs],
};

export const Basic = () => <BoxPlot />;
