import { init } from "@rematch/core";
import updatedPlugin from "@rematch/updated";
import selectPlugin from "@rematch/select";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import createTransform from "redux-persist/es/createTransform";
import * as models from "./models/index";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["NotificationsQueueModel"],
  // Transform dates back into JS Dates on rehydrate
  // (see: https://github.com/rt2zz/redux-persist/issues/82)
  transforms: [
    createTransform(JSON.stringify, (toRehydrate) =>
      JSON.parse(toRehydrate, (key, value) =>
        typeof value === "string" &&
        value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
          ? new Date(value)
          : value
      )
    ),
  ],
};

const store = init({
  name: "MainStore",
  models,
  plugins: [persistPlugin(persistConfig), updatedPlugin(), selectPlugin()],
});

export default store;
