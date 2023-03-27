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

app.shortcut('who_am_i', async ({
    shortcut,
    ack,
    client
}) => {
    try{
        await ack();
        const result = await client.views.open({
            trigger_id: shortcut.trigger_id,
            view: {
                type: "modal",
                title: {
                    type: "plain_text",
                    text: "My App"
                },
                close: {
                    type: "plain_text",
                    text: "Close"
                },
                blocks: [{
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "Hello!"
                    }
                }]
            }
        });
        console.log(result);
    }catch(error){
        console.error(error);
    }
});