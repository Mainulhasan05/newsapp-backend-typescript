"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const db_1 = __importDefault(require("./config/db"));
// Call the connection function
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(
  (0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use("/api", index_1.default);
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Typescript Express API",
  });
});
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
  console.log("Server is running on port http://localhost:" + PORT);
});
