import { createStore, applyMiddleware, Store } from "redux";
import { logger, thunk } from "../middleware";
import { rootReducer, RootState } from "./root";
import { composeWithDevTools } from "redux-devtools-extension";

export function configuredStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(thunk, logger);

  // if(process.env.NODE_ENV !== 'PRODUCTION'){
  middleware = composeWithDevTools(middleware);
  // }

  const store = createStore(
    rootReducer as any,
    initialState as any,
    middleware
  ) as Store<RootState>;

  // if (module.hot) {
  //     module.hot.accept('./root/reducer', () => {
  //         const nextReducer = require('./root/reducers');
  //         store.replaceReducer(nextReducer)
  //     });
  // }
  return store;
}

const store = configuredStore();

export default store;
