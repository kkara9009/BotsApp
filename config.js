const fs = require('fs')
const { DataTypes, Sequelize } = require('sequelize');
if (fs.existsSync('config.env')){
    require('dotenv').config({ path: './config.env'});
}

const convertToLogLevel = (value) => {
    var log = false;
    if (typeof value === "string") {
        if (value.toLowerCase() === "true") {
            log = console.log;
        }
    }
    return log;
}

// Declare these environment variables first
process.env.DATABASE_URL = process.env.DATABASE_URL === undefined ? './BotsApp.db' : process.env.DATABASE_URL;
// TODO: change default level to false for release.
process.env.DEBUG = process.env.DEBUG === undefined ? true : false;

const env = {
    STRING_SESSION: process.env.STRING_SESSION === undefined ? '' : process.env.STRING_SESSION,
    HEROKU: process.env.HEROKU === undefined ? false : true,
    PREFIX: process.env.PREFIX === undefined ? /^[.?!]/g : process.env.PREFIX,
    COUNTRY_CODE: process.env.COUNTRY_CODE === undefined ? "91" : process.env.COUNTRY_CODE,
    OCR_API_KEY: process.env.OCR_API_KEY === undefined ? "9ffb44def388957" : process.env.OCR_API_KEY,
    CURRENT_WEATHER_API_KEY:
        process.env.CURRENT_WEATHER_API_KEY === undefined
            ? "6729ac2b2e2bb5c686ff427a2f06df92"
            : process.env.CURRENT_WEATHER_API_KEY,
    FORECAST_WEATHER_API_KEY:
        process.env.FORECAST_WEATHER_API_KEY === undefined
            ? "bf668bc1b20bcbcf6ba1db5430ed4f1e"
            : process.env.FORECAST_WEATHER_API_KEY,
    SERPAPI_API_KEY:
        process.env.SERPAPI_API_KEY === undefined
            ? "745bd27ba76218d9be5f32c01b0bdeab8541616ff2bc1aa1e6c30fb5c89a07c3"
            : process.env.SERPAPI_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    DEBUG: process.env.DEBUG,
    DATABASE: process.env.DATABASE_URL === './BotsApp.db' ? new Sequelize({ dialect: "sqlite", storage: process.env.DATABASE_URL, logging: convertToLogLevel(process.env.DEBUG) }) : new Sequelize({ dialect: "postgres", storage: process.env.DATABASE_URL}),
}

module.exports = env