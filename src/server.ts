import { app } from "./app";
import { jwtConfig } from "./config";

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}.`);
});
