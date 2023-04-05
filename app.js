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

    try {
        /* view.publish is the method that your app uses to push a view to the Home tab */
        await client.views.publish({
     
          /* the user that opened your app's app home */
          user_id: event.user,
     
          /* the view object that appears in the app home*/
          view: {
            type: 'home',
            callback_id: 'home_view',
     
            /* body of the view */
            blocks: [
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "*Welcome to your _App's Home_* :tada:"
                }
              },
              {
                "type": "divider"
              },
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app."
                }
              },
              {
                "type": "actions",
                "elements": [
                  {
                    "type": "button",
                    "text": {
                      "type": "plain_text",
                      "text": "Click me!",
                    }
                  }
                ]
              }
            ]
          }
        });
      }
      
      catch (error) {
        console.error(error);
      }

});