import { extendTheme } from "native-base";

export const theme = extendTheme({
  components: {
    Box: {
      baseStyle: {},
    },
    Input: {
      baseStyle: {
        _focus: { backgroundColor: "white" },
        _hover: { backgroundColor: "white" },
      },
    },
    Button: {
      baseStyle: {
        _text: { fontWeight: "bold" },
      },
    },
  },
  fontConfig: {
    Lato: {
      100: {
        normal: "Lato-Thin",
      },
      300: {
        normal: "Lato-Light",
      },
      400: {
        normal: "Lato-Regular",
      },
      700: {
        normal: "Lato-Bold",
      },
      900: {
        normal: "Lato-Black",
      },
    },
  },
  fonts: {
    // heading: "Lato",
    // body: "Lato",
    // mono: "Lato",
  },
  fontWeights: {
    heading: "900",
  },
});
