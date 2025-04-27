const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348153208405",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUMxdU9VTm1BRGhhRGY4Z0ZqL004YUdaUFhkUEdEQ2RDeW4vTzdWbVYxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHNJeXBBNERvMUpZYzI0YXdJbitES1pma1Rtek9wUUIvWEhnK0pEL0dVRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQllydnRJaHhIdmJ4MEF4ZXI1UFZVNEJ5RDNjRmhoMisyalBCMDNYNUZ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpZEJvTXJ6RXlpbDQ4VUZCbi9sS2Y4eXd6NEdTUnQwYnBLNkkwcmkwVzFnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdLcHJtaE5ObG85SFhlSTgwWkdCRnZCazJqOEFYZmtOYlNDbDB2U1VXazA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijg2NW1sR1NuYU8vUmZ1cXJUd0cwZzg1SG4wRjhUNVg2bExRVE1wYitJQkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUtZM3MydFpxSDVobk1zc1lwUEdxbmE1K3J1UXdka3U2MDJ2bkFrVDlrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYWdIRkFUSm04bkpWb09PR0paUENuWC9sMW9NVWdTeHJ0Z3JnY043TmtnMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZ3YXdqdWdZNFltem9jYVhDb05YL1FsbmpKZkZWTXNCQ1JWWVFBSmJtZUMvZnArai9KbXlvMjJOY2RyVXhDTG1KcFJiblFvVkdFN3E2S3l6RkNZZWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI5LCJhZHZTZWNyZXRLZXkiOiJacnlRVTV3K3ZmN3dpVEJxb055RG03VTBYS3huakU4RVplZzcwZyt1ZVhzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxS1RGTVFTQyIsIm1lIjp7ImlkIjoiMjM0ODE1MzIwODQwNTozMEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE2MzY4NjU3Mjg1MjY0OjMwQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXZUMThnREVOL1h0OEFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUXFwd1E2QnpkRHZUZmVNTUdrTStLMFpmMDdoRHZQSkhLdy9vR2lCVVMyND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY2NBeWlaS2UyYm81Z2R3SXVyWm5neUxNTWRYUnFxYVJXKysrcjQ5WFB4SE9pQ1J2VGtSMUt2U1dyMFN6MWc4d3BIVmhIS1RRczFtdmFzaTIyVjZTQVE9PSIsImRldmljZVNpZ25hdHVyZSI6IlVBYU01cVd5WlFaTUp4QlJhb1VuVnNoMk9sZHJtSWZ6L3pXUmMvcGwwTEVXNEhBZDBmVWdmdmtKYlVERzRxREFIVFNUdDZRQlgrZ0lHRnNmMDdYR2h3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODE1MzIwODQwNTozMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVS3FjRU9nYzNRNzAzM2pEQnBEUGl0R1g5TzRRN3p5UnlzUDZCb2dWRXR1In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU3NDI4MjksImxhc3RQcm9wSGFzaCI6Im5tM0JiIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
