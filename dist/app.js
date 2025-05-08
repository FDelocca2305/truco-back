"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const requestLogger_1 = __importDefault(require("./middlewares/requestLogger"));
const sessions_1 = require("./middlewares/sessions");
const pusherRouter_1 = __importDefault(require("./routers/pusherRouter"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const friendsRouter_1 = __importDefault(require("./routers/friendsRouter"));
const statsRouter_1 = __importDefault(require("./routers/statsRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing json (and create req.body etc)
app.use((0, cookie_parser_1.default)()); // for parsing cookies
app.use(express_1.default.urlencoded({ extended: true })); // for parsing URL-encoded request bodies
if (process.env.DEBUG === "true") { // for development
    app.use((0, cors_1.default)({
        origin: "http://localhost:3001",
        credentials: true, // Origin can't be "*" when using credentials
    }));
    console.log("CORS enabled");
}
app.use((0, express_session_1.default)({
    name: "qid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI,
        touchAfter: 24 * 3600, // 1 day
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: false
    },
}));
app.use(sessions_1.populateSession); // for populating req.session.user
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'))); // for serving static files
app.use(requestLogger_1.default); // for logging requests and status codes
// Routes
app.use("/api/pusher", pusherRouter_1.default);
app.use("/api/auth", authRouter_1.default);
app.use("/api/friends", friendsRouter_1.default);
app.use("/api/stats", statsRouter_1.default);
app.use("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/public/index.html'));
});
exports.default = app;
