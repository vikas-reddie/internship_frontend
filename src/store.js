import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './reducers/authReducer';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducers({
  auth: authReducer,
}));


const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
