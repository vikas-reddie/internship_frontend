import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import authReducer from './reducers/authReducer';
import App from './App';

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, combineReducers({
  auth: authReducer,
}));

// Create the store with the persisted reducer
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
