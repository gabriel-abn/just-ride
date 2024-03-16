import app from "@/main/app";
import env from "@/main/env";

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});
