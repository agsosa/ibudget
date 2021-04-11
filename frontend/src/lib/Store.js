import { init } from "@rematch/core";
import loadingPlugin from "@rematch/loading";
import updatedPlugin from "@rematch/updated";
import selectPlugin from "@rematch/select";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import * as models from "./Models";

const persistConfig = {
  key: "root",
  storage,
};

const store = init({
  name: "MainStore",
  models,
  plugins: [
    persistPlugin(persistConfig),
    updatedPlugin(),
    loadingPlugin(),
    selectPlugin(),
  ],
});

export default store;
