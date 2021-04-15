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
  // TODO FIXME: For some reason the cookies will not be sent by passport if we configure the cookie object here
  cookie: {
    sameSite: exports.env === "production" ? "none" : "lax",
    secure: exports.env === "production",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  saveUninitialized: false,
};

exports.corsConfig = {
  origin:
    exports.env === "development"
      ? "http://localhost:3000"
      : "https://ibudgetapp.netlify.app",
  credentials: true,
};
