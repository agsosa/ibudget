import { init } from "@rematch/core";
import * as models from "./Models";

const store = init({ name: "Main store", models });

export default store;
