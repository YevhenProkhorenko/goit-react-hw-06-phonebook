import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistContacts } from './reducers';
export const store = configureStore({
  reducer: {
    contacts: persistContacts,
  },
});
export const persistore = persistStore(store);
