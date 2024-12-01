import { put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import NetInfo from '@react-native-community/netinfo';
import { OFFLINE, ONLINE } from 'redux-offline-queue';

export function* startWatchingNetworkConnection() {
  const channel = eventChannel((emitter) => {
    // NetInfo.addEventListener('connectionChange', emitter);
    const unsubscribe = NetInfo.addEventListener((state) => {
      emitter(state.isConnected && state.isInternetReachable);
    });

    // return () => NetInfo.removeEventListener('connectionChange');
    return () => unsubscribe();
  });

  try {
    while (true) {
      const isConnected = yield take(channel);

      if (isConnected) {
        yield put({ type: ONLINE });
      } else {
        yield put({ type: OFFLINE });
      }
    }
  } finally {
    channel.close();
  }
}
