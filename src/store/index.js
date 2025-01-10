import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/auth/loginSlice";
import paginationSlice from "@/features/pagination/paginationSlice";
import loadingSlice from "@/features/loading/loadingSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import logger from "redux-logger";

const reducers = combineReducers({
	// daftar reducer
	user: userSlice,
	pagination: paginationSlice,
	loading: loadingSlice,
});

const persistConfig = {
	key: "root",
	storage, // jenis penyimpanana untuk menyimpan data store
	// blacklist: ["search"], // mendaftarkan data store mana yang tidak ingin dipersist/ artinya datanya tidak ingin disimpan di storange(localStorange),
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
