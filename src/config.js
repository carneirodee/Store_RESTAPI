require('dotenv').config({ path: 'src/.env' })

global.SALT_KEY = process.env.SALT_KEY;
global.EMAIL_TMPL = process.env.EMAIL_TMPL;
global.SENDGRID_KEY = process.env.SENDGRID_KEY;
module.exports = {
    connectionString: process.env.CONNECTION_STRING,
    sendgridKey: process.env.SENDGRID_KEY,
}