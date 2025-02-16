const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUdWVEJNclVwZ2pPUDFPNk5HbzVoSHpRUHQzcCtnMWpKZjArdUhxWDdXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1lxU1grTHpsemtMVG9SNzY0QkpSbHJOSm1ZYWs3Qk95SFh0Si9POFdYOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVUFE0Q1ZMZmZjUXU3cWt2YTdiV1pyL1NsQkFtWU9UaFROa3phZklpQTI4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyZ0lBVlBnWm9qM3lYT2Q4OWFiZVdnNGYwSG5hYXlDSWtTYjFVMUNjeEFzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdGOEtHczB5R3gwSUl1SFh3Y00yTlR1SllQRVl4WmhXUFVwZ1hHV0NKbDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhldXVWZUNvek5LOXNUUVRtTHVFUGJyNFJyaS9ScHpCbTRjMXZRTEdDRFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU12cFgxMXR4bEpOWDVGWVVjTkFJM0NiTVo5bC9RQStEM1NESUxvZEgxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDFHcUcvNU5VaVRlajhkMDdOUlQrZHNndWU5dmI1cURjNWhNZWdYcWtpMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVqUlQrNExaSTg4OUgrY1FXOVhvU1RWazh5dTBoSmlaSG91eEVzZ2E0MnR1b1lSNkFKeThzUldSazlBbFJ0RHNRRitqNmxRczc0RU5iQlJRSUNpc0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NiwiYWR2U2VjcmV0S2V5IjoiOUZTTm1lRVVLWWpNZUlpWkNKNWEybmZrMjFTbmFod1QveVhtUjJjV0trST0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiNVFEbGQ3VXpTMVNBTXpObjRvVTRiQSIsInBob25lSWQiOiJhYzliNWQ0NS0yNzFkLTRkNGYtODk4MS1kMWNjZDEzYTE1MmMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTRCU1NhUXFBQ3JqZlUxWUZmL0xXaVc3NGFFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhwaDJZUjczWE1XRnVKZmFQTm0zcFA5V0N4ND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJDQlo4NUNWTSIsIm1lIjp7ImlkIjoiMjI1ODQzNTEwMzU6M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTDJsMDQ4REVOSCt4cjBHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRzNYNkdCU2dwazdoQlArZ3F2UElud3lUU0grUXduUTZZMnFCYUVwQm9HRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRVVrcGNhSmUxVEdOOTdJK2k2cjZ3Q1RiNnhTNmExdGR1YldzZGJqa3RHZzM2ODF0VHlTRHdNZnBqZmZ4Z0pMWXJ0bTJ4eUpzZWt1b2lLdHZNNkVGQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6IlFvMVZJZFZLUHdXU3I1THRreTZyV21pNmRuWEh4Z2d5Vm9Rb3gyaktLcUdHbk5sbUl0VXhZeVhaU3d1NHJBZUsyRFJEcW80SUZIZ3FyV3VmSmsrakRRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI1ODQzNTEwMzU6M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSdDEraGdVb0taTzRRVC9vS3J6eUo4TWswaC9rTUowT21OcWdXaEtRYUJoIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM5NzAyMTEwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUtSMiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
