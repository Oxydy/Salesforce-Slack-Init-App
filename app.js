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
        const connection = new jsforce.Connection({
            loginUrl: process.env.SF_LOGIN_URL
        });
        const userInfo = await connection.login(
            process.env.SF_USERNAME,
            process.env.SF_PASSWD
        );
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
                        text: "Logged in with user using userId ${userInfo.Id}"
                    }
                }]
            }
        });
        console.log(result);
    }catch(error){
        console.error(error);
    }
});