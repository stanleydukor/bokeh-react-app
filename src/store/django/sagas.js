import { takeLatest, fork, call, put } from "redux-saga/effects";
import { types } from "./constants";
import api from "./api";

function* djangoSaga({ payload }) {
  yield put({ type: types.APPLY_BLUR_LOADING });
  try {
    const result = yield call(api.applyBlur, payload);
    yield put({ type: types.APPLY_BLUR_SUCCESS, payload: result.data });
  } catch (e) {
    yield put({ type: types.APPLY_BLUR_FAILED });
  }
}

function* watchDjango() {
  yield takeLatest(types.APPLY_BLUR, djangoSaga);
}

export const djangoSagas = [fork(watchDjango)];
