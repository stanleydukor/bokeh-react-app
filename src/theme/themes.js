import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import * as Colors from "./colors";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const styleConfig = {
  styles: {
    global: props => ({
      body: {
        bg: mode(Colors.white[100], Colors.black[200])(props),
        boxSizing: "border-box"
      }
    })
  },
  components: {
    Text: {
      baseStyle: {
        fontWeight: "medium",
        color: Colors.white[200]
      },
      sizes: {
        xl: {
          fontSize: "40px"
        },
        lg: {
          fontSize: "30px"
        },
        md: {
          fontSize: "20px"
        },
        sm: {
          fontSize: "18px"
        },
        xs: {
          fontSize: "16px"
        },
        xxs: {
          fontSize: "14px"
        }
      },
      variants: {
        header: props => ({
          color: mode(Colors.black[100], Colors.white[100])(props),
          fontWeight: "bold"
        })
      }
    },
    IconButton: {
      variants: {
        primary: {
          bg: Colors.gold[100],
          color: Colors.white[100]
        },
        secondary: {
          bg: Colors.black[300],
          color: Colors.white[300]
        }
      }
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
        _focus: { boxShadow: "none" },
        _hover: { opacity: 0.9 }
      },
      sizes: {
        xl: {
          h: "48px",
          w: "213px",
          fontSize: "18px"
        },
        lg: {
          h: "48px",
          w: "168px",
          fontSize: "18px"
        },
        sm: {
          h: "48px",
          w: "97px",
          fontSize: "18px"
        }
      },
      variants: {
        primary: {
          bg: Colors.gold[100],
          color: Colors.white[100]
        },
        secondary: {
          bg: Colors.black[300],
          color: Colors.white[300]
        }
      }
    }
  }
};

export const theme = extendTheme({ config, ...styleConfig });
