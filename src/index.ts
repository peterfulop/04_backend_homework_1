import App from "./app";
import FoodController from "./resources/food/food.controller";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([new FoodController()], Number(process.env.PORT));

app.listen();
