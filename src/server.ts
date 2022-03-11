import dotenv from "dotenv";
import app from "./app";
dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `App is running on port: ${port}... mode:${process.env.NODE_ENV}`
  );
});
