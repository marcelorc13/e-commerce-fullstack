import { app } from "./app";
import { dotenvConfig } from "./config/dotenvConfig";

dotenvConfig();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));