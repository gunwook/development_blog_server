import { createLogger, format, transports } from "winston"
import * as DailyRotateFile from "winston-daily-rotate-file"

import * as fs from "fs"
const env = process.env.NODE_ENV || "development"
const logDir = "log"

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir)
}

const dailyRotateFileTransport = new DailyRotateFile({
  level: "debug",
  filename: `${logDir}/%DATE%-smart-push.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d"
})

export const logger = createLogger({
  level: env === "development" ? "debug" : "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp } : any) => {
            console.log(message + " -------")
            return `${timestamp} ${level}: ${message}`
        })
      )
    }),
    dailyRotateFileTransport
  ]
})

