import {
  indigo,
  indigoDark,
  teal,
  tealDark,
  blackA,
  whiteA,
  mauve,
  mauveDark,
  mauveA,
  mauveDarkA,
} from "@radix-ui/colors";

export type ColorCategoryTypes = "primary" | "secondary" | "gray" | "grayA";

export type PaletteTypes = {
  [key in ColorCategoryTypes]: {
    [key in string]: string;
  };
};

import { ThemeTypes } from "../stitches.congif";

const themes: { [key in ThemeTypes]: PaletteTypes } = {
  light: {
    primary: indigo,
    secondary: teal,
    gray: mauve,
    grayA: mauveA,
  },
  dark: {
    primary: indigoDark,
    secondary: tealDark,
    gray: mauveDark,
    grayA: mauveDarkA,
  },
};

const makePalette = (theme: ThemeTypes) => {
  const palette = themes[theme];

  const text = {
    "text-contrast-high": palette.primary.indigo12,
    "text-contrast-low": palette.primary.indigo11,
    "text-black": blackA.blackA12,
    "text-white": whiteA.whiteA12,
  };

  const gray = {
    "gray-01": palette.gray.mauve1,
    "gray-02": palette.gray.mauve2,
    "gray-03": palette.gray.mauve3,
    "gray-04": palette.gray.mauve4,
    "gray-05": palette.gray.mauve5,
    "gray-06": palette.gray.mauve6,
    "gray-07": palette.gray.mauve7,
    "gray-08": palette.gray.mauve8,
    "gray-09": palette.gray.mauve9,
    "gray-10": palette.gray.mauve10,
    "gray-11": palette.gray.mauve11,
    "gray-12": palette.gray.mauve12,
  };

  const grayA = {
    "grayA-01": palette.grayA.mauveA1,
    "grayA-02": palette.grayA.mauveA2,
    "grayA-03": palette.grayA.mauveA3,
    "grayA-04": palette.grayA.mauveA4,
    "grayA-05": palette.grayA.mauveA5,
    "grayA-06": palette.grayA.mauveA6,
    "grayA-07": palette.grayA.mauveA7,
    "grayA-08": palette.grayA.mauveA8,
    "grayA-09": palette.grayA.mauveA9,
    "grayA-10": palette.grayA.mauveA10,
    "grayA-11": palette.grayA.mauveA11,
    "grayA-12": palette.grayA.mauveA12,
  };

  const primary = {
    "primary-01": palette.primary.indigo1,
    "primary-02": palette.primary.indigo2,
    "primary-03": palette.primary.indigo3,
    "primary-04": palette.primary.indigo4,
    "primary-05": palette.primary.indigo5,
    "primary-06": palette.primary.indigo6,
    "primary-07": palette.primary.indigo7,
    "primary-08": palette.primary.indigo8,
    "primary-09": palette.primary.indigo9,
    "primary-10": palette.primary.indigo10,
    "primary-11": palette.primary.indigo11,
    "primary-12": palette.primary.indigo12,
  };

  const secondary = {
    "secondary-01": palette.secondary.teal1,
    "secondary-02": palette.secondary.teal2,
    "secondary-03": palette.secondary.teal3,
    "secondary-04": palette.secondary.teal4,
    "secondary-05": palette.secondary.teal5,
    "secondary-06": palette.secondary.teal6,
    "secondary-07": palette.secondary.teal7,
    "secondary-08": palette.secondary.teal8,
    "secondary-09": palette.secondary.teal9,
    "secondary-10": palette.secondary.teal10,
    "secondary-11": palette.secondary.teal11,
    "secondary-12": palette.secondary.teal12,
  };

  return {
    ...text,
    ...gray,
    ...grayA,
    ...primary,
    ...secondary,
  };
};

export const colors = {
  dark: makePalette("dark"),
  light: makePalette("light"),
};
