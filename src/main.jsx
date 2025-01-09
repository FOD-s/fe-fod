import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/index";
import MainSkeleton from "./components/atoms/MainSkeleton";

import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense loading={<MainSkeleton />}>
          <RouterProvider router={router} />
          <Toaster />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
