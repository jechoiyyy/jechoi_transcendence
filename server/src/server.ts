// app 실행, listen 진행
import { creatApp } from "./app";

const PORT = Number(process.env.PORT ?? 3000);

const app = creatApp();

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
