import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// function that makes the api request and returns a Promise for response
function search(query, url, meta) {
  const queries = [];
  for (const i in meta) {
    const wildcard = {};
    wildcard[`metadata.${meta[i]}`] = `*${query}*`;
    queries.push({
      nested: {
        path: 'metadata',
        score_mode: 'avg',
        query: {
          wildcard
        }
      }
    });
  }

  return axios({
    method: 'post',
    url: `${url}/_search`,
    data: {
      query: {
        dis_max: {
          tie_breaker: 0.7,
          boost: 1.2,
          queries
        }
      }
    }
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(params) {
  try {
    const data = yield call(
      search,
      params.query,
      params.url,
      params.meta
    );

    params.cb(data);
    // dispatch a success action to the store with the new data
    yield put({ type: 'API_CALL_SUCCESS', data });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: 'API_CALL_FAILURE', error });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
}
