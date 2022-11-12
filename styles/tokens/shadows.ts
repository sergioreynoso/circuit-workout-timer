import { colors } from "./colors";

const shadows = {
  dark: {
    normal: `0 2px 10px ${colors.dark["primary-03"]}`,
    focus: `0 0 0 2px ${colors.dark["primary-09"]}`,
    high: ` 0px 0.3px 0.3px ${colors.dark["grayA-04"]},
    -0.1px 1.9px 2.1px -0.4px ${colors.dark["grayA-04"]},
    -0.1px 3.5px 3.9px -0.7px ${colors.dark["grayA-04"]},
    -0.2px 5.8px 6.5px -1.1px ${colors.dark["grayA-04"]},
    -0.3px 9.3px 10.5px -1.4px ${colors.dark["grayA-04"]},
    -0.4px 14.5px 16.3px -1.8px ${colors.dark["grayA-04"]},
    -0.7px 22.1px 24.9px -2.1px ${colors.dark["grayA-04"]},
    -1px 32.5px 36.6px -2.5px ${colors.dark["grayA-04"]};`,
  },
  light: {
    normal: `0 2px 10px ${colors.light["primary-03"]}`,
    focus: `0 0 0 2px ${colors.light["primary-09"]}`,
    high: ` 0px 0.3px 0.3px ${colors.light["grayA-04"]},
    -0.1px 1.9px 2.1px -0.4px ${colors.light["grayA-04"]},
    -0.1px 3.5px 3.9px -0.7px ${colors.light["grayA-04"]},
    -0.2px 5.8px 6.5px -1.1px ${colors.light["grayA-04"]},
    -0.3px 9.3px 10.5px -1.4px ${colors.light["grayA-04"]},
    -0.4px 14.5px 16.3px -1.8px ${colors.light["grayA-04"]},
    -0.7px 22.1px 24.9px -2.1px ${colors.light["grayA-04"]},
    -1px 32.5px 36.6px -2.5px ${colors.light["grayA-04"]};`,
  },
};

export { shadows };
