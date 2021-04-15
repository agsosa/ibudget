exports.env = process.env.NODE_ENV || "development";

exports.serverPort = process.env.PORT || 4002;

exports.dbPoolConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

exports.sessionConfig = {
  // TODO: Add persistence
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: exports.env === "production", // IMPORTANT: Only set true when behind a reverse proxy!
  cookie: {
    sameSite: exports.env === "production" ? "none" : "lax",
    secure: exports.env === "production",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
};

exports.corsConfig = {
  origin:
    exports.env === "development"
      ? "http://localhost:3000"
      : "https://ibudgetapp.netlify.app",
  credentials: true,
};
