const winston = require("winston");
const expressWinston = require("express-winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/app_error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/app_combined.log" }),
  ],
});

exports.logger = logger;
