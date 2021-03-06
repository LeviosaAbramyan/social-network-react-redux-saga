import {FETCH_AUTH_USER, REQUEST_AUTH_USER} from "../types";
import {takeEvery, call, put} from "redux-saga/effects";

export default function* sagasWatcherUserSignUp() {

    yield takeEvery(FETCH_AUTH_USER, sagaWorkerUserAuth)

}

function* sagaWorkerUserAuth(action) {
    const payload = yield call(fetchSignUp, action)
    yield put({type: REQUEST_AUTH_USER, payload})
}


async function fetchSignUp(payload) {

    const res = await fetch('https://postify-api.herokuapp.com/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(payload)
    })
    const result = await res.json();
 
    return result
}