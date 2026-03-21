import {
  compose,
  createStore,
  applyMiddleware,
  type Middleware,
  type StoreEnhancer,
} from 'redux';
import {
  persistStore,
  persistReducer,
  type PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares: Middleware[] = [sagaMiddleware];

const isDev = import.meta.env.MODE !== 'production';

if (isDev) {
  middleWares.push(logger as Middleware);
}

const composeEnhancer: typeof compose =
  (isDev &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers: StoreEnhancer = composeEnhancer(
  applyMiddleware(...middleWares),
);

export const store = createStore(persistedReducer, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
