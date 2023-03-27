require('dotenv').config();

const { App } = require('@slack/bolt');

const app = new App({
    token: process.env.SLACK_APP_BOT_TOKEN,
    signingSecret: process.env.SLACK_APP_SIGNING_SECRET
});

(async () => {
    const port = 3000
    await app.start(process.env.PORT || port);
    console.log('⚡️ Bolt app is running');
})();