import { Middleware, isAction, UnknownAction } from 'redux';

import { RootState } from '../store';

const hasPayload = (
  action: UnknownAction,
): action is UnknownAction & { payload: unknown } => 'payload' in action;

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!isAction(action)) {
      return next(action);
    }

    console.log('type: ', action.type);

    if (hasPayload(action)) {
      console.log('payload: ', action.payload);
    }

    console.log('currentState: ', store.getState());

    const result = next(action);

    console.log('next state: ', store.getState());

    return result;
  };
