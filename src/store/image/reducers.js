import { types } from "./constants";

const initialState = {
  rgbImageUrl: null,
  depthImageUrl: null,
  mainRgbCanvas: null,
  mainDepthCanvas: null,
  displayRgbCanvas: null,
  prevRgbSize: { width: null, height: null },
  parameters: {
    focalLength: 1,
    DoF: 0,
    fStop: 1.8,
    shape: "disk"
  },
  scaleParams: {
    ratio: 1,
    centerShift_x: 0,
    centerShift_y: 0,
    translatePos: {
      x: 0,
      y: 0
    },
    scale: 1.0,
    scaleMultiplier: 0.8,
    startDragOffset: {},
    mouseDown: false
  },
  operationStack: {
    rgbStack: []
  }
};

export const imageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.HANDLE_CHANGE:
      return {
        ...state,
        [payload.name]: payload.files[0]
      };
    case types.UPDATE_STATE:
      return {
        ...state,
        ...payload
      };
    case types.INIT_IMAGE:
      var { name, value } = payload;
      if (name === "rgbImageUrl") {
        return {
          ...state,
          [name]: value,
          displayRgbCanvas: null,
          prevRgbSize: { width: null, height: null },
          scaleParams: {
            ratio: 1,
            centerShift_x: 0,
            centerShift_y: 0,
            translatePos: {
              x: 0,
              y: 0
            },
            scale: 1.0,
            scaleMultiplier: 0.8,
            startDragOffset: {},
            mouseDown: false
          },
          operationStack: {
            ...state.operationStack,
            rgbStack: []
          }
        };
      }
      return {
        ...state,
        [name]: value
      };
    case types.STORE_PARAMETERS:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          ...payload
        }
      };
    case types.STORE_SCALE_PARAMS:
      var { name, value } = payload;
      return {
        ...state,
        scaleParams: {
          ...state.scaleParams,
          ...payload
        }
      };
    case types.ADD_EFFECT:
      if (
        state.operationStack.rgbStack.length !== 0 &&
        state.operationStack.rgbStack[state.operationStack.rgbStack.length - 1].func.toString() ===
          payload.func.toString()
      ) {
        state.operationStack.rgbStack.pop();
      }
      return {
        ...state,
        operationStack: {
          ...state.operationStack,
          rgbStack: [...state.operationStack.rgbStack, { ...payload }]
        }
      };
    case types.ZOOM_IN:
      return {
        ...state,
        scaleParams: {
          ...state.scaleParams,
          scale: state.scaleParams.scale / state.scaleParams.scaleMultiplier
        }
      };
    case types.ZOOM_OUT:
      return {
        ...state,
        scaleParams: {
          ...state.scaleParams,
          scale: state.scaleParams.scale * state.scaleParams.scaleMultiplier
        }
      };
    case types.UNDO:
      var rgbStack = state.operationStack.rgbStack;
      var lastEffect = -1;
      rgbStack.forEach((element, index) => {
        if (index !== 0) {
          lastEffect = index;
        }
      });
      var newRgbStack = rgbStack.filter((x, index) => {
        if (index !== lastEffect) {
          return x;
        }
      });
      return {
        ...state,
        operationStack: {
          ...state.operationStack,
          rgbStack: [...newRgbStack]
        }
      };
    case types.RESET:
      var rgbStack = [state.operationStack.rgbStack[0]];
      return {
        ...state,
        scaleParams: {
          ...state.scaleParams,
          translatePos: {
            x: 0,
            y: 0
          },
          scale: 1.0,
          scaleMultiplier: 0.8,
          startDragOffset: {},
          mouseDown: false
        },
        operationStack: {
          ...state.operationStack,
          rgbStack: [...rgbStack]
        }
      };
    case types.REMOVE_ITEM:
      if (payload === "rgbImageUrl") {
        return {
          ...state,
          rgbImageUrl: null,
          mainRgbCanvas: null,
          displayRgbCanvas: null
        };
      }
      return {
        ...state,
        depthImageUrl: null,
        mainDepthCanvas: null
      };
    case types.REMOVE_ALL_ITEM:
      return {
        ...state,
        ...initialState
      };
    default: {
      return state;
    }
  }
};
