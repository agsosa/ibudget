import { init } from "@rematch/core";
import * as models from "./Models";

const store = init({ name: "MainStore", models });

export default store;
