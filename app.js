require('dotenv').config();

const { App } = require('@slack/bolt');
const jsforce = require('jsforce');

const app = new App({
    token: process.env.SLACK_APP_BOT_TOKEN,
    signingSecret: process.env.SLACK_APP_SIGNING_SECRET
});

(async () => {
    const port = 3000
    await app.start(process.env.PORT || port);
    console.log('⚡️ Bolt app is running');
})();

app.event('app_home_opened', async ({ event, say, client, view }) => {
    console.log('⚡️Hello! Someone just opened the app to DM so we will send them a message!')
    say(`Hello world and <@${event.user}>! `)

});