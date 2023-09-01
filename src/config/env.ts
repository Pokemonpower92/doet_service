export const dbENV = {
    port: process.env.DB_PORT || "27017",
    host: process.env.HOST || "127.0.0.1",
    database: process.env.DB || "doetDB"
};

export const APP_PORT = process.env.APP_PORT || 3030
