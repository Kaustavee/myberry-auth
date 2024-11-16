import winston, { type LoggerOptions } from "winston";
import { createLogger } from "winston";
import { ENVIRONMENT } from "./config.ts";

const transports: winston.transport[] = [new winston.transports.Console()];

if (ENVIRONMENT !== "production") {
  transports.push(new winston.transports.File({ filename: "application.log" }));
}

const options: LoggerOptions = {
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message, label = "app", timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    })
  ),
  transports,
};

const logger = createLogger(options);

export function namedLogger(name: string) {
  return logger.child({ label: name });
}

export default logger;
