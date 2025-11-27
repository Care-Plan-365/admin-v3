import { all, fork } from 'redux-saga/effects';
import { authSaga } from './auth/sagas';
import { providersSaga } from './providers/sagas';
import { patientsSaga } from './patients/sagas';

export function* rootSaga() {
  yield all([fork(authSaga), fork(providersSaga), fork(patientsSaga)]);
}
