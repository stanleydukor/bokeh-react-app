import { types } from "./constants";

const initialState = {
  blurredImage: null,
  isLoading: false
};

export const djangoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.APPLY_BLUR_SUCCESS:
      return { ...state, blurredImage: payload, isLoading: false };
    case types.APPLY_BLUR_FAILED:
      return { ...state, blurredImage: null, isLoading: false };
    case types.APPLY_BLUR_LOADING:
      return { ...state, isLoading: true };
    default: {
      return state;
    }
  }
};
