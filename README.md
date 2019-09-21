# Build an App to Send SMS Surveys with Twilio + Airtable on Standard Library
[<img src="https://deploy.stdlib.com/static/images/deploy.svg" width="192">](https://deploy.stdlib.com/)

Today we will be using [Build on Standard Library](https://build.stdlib.com) to launch an app to send SMS surveys to your friends, using Twilio and Airtable. In just a few easy steps we will set up your Airtable and show you how to begin aggreagting feedback from your group in one easy-to-read Base. For an indepth tutorial on how to Build this workflow from scratch, [click here](https://medium.com/@brimm_reaper/build-an-app-to-send-sms-surveys-with-twilio-airtable-on-standard-library-ef5be1cd4f0b). This is also a great resource should you encounter any hiccups along the way.

## Setting up Airtable
Before we are ready to deploy from Github, we will need to set up our Airtable Base. [Click here](https://www.airtable.com) to get your free Airtable account, and then [add our Base template by clicking here.](https://airtable.com/addBaseFromShare/shrf3W1JpexdDzfio) It should look something like this:

![setup page](/readme/images/setup.png)

Yours won't have the polarizing question pre-populated, but feel free to add your first inquiry in the first column, as seen here. Your **wasSent** column should also be missing the green check mark. We will get to that shortly. Next click into the **Contacts** table, and add your phone number into the first column. Be sure to follow this format: **country code** + **area code** + **phone number**. Your final number should look like this: **14155679876**. You're not ready to click on the Deploy button and complete setting up your workflow on Standard Library.

## Deploying To Standard Library
[<img src="https://deploy.stdlib.com/static/images/deploy.svg" width="192">](https://deploy.stdlib.com/)

From the project page, you should see the below about midway down the page:

![link resources](/readme/images/link-resources.png)

Link your Airtable account first, and then select the Base that we set up earlier. It should be names **Twilio Survey** by default, and the dialog box will look like the below:

![airtable bases](/readme/images/airtable-bases.png)

Click **Finish** to complete linking of your Base with your Standard Library account and that is it. You should see an **Identity Generated** message in the bottom right of this box, next to a green circle. Now proceed to click **Link Resource** to add a Twilio account and number. If you have never used Twilio on Standard Library before, you will be brought to a login screen. Once you are logged in, you will need to purchase a number for use on Standard Library. Please note that any numbers not purchased through Standard Library will be **unavailable** for use within a Standard Library workflow. This is the result of how Twilio Connect Apps work ([click here for more information on Twilio Connect Apps](https://www.twilio.com/docs/iam/connect)). If you have used Twilio on Standard Library in the past, you will see your previously linked numbers listed here. Feel free to choose one of these or to purchase a new number for use with this applicattion.

When you've completed these two steps, the blue **Deploy Project** button should become enabled, and you will be ready to launch your application.

![deploy button activate](/readme/images/deploy.png)

## Conducting Surveys
This takes care of everything that you need to conducting surveys! But there is still a bit of work left to be done on your part. For starters, how do you actually send the surveys? Well, you will need to ping the URL that is generated by our workflow. Once you have deployed your project, under **Development Environments** click on **dev (click to manage)** to see the events that were set up when you clicked on **Deploy**. Scroll down to **Endpoints (Advanced)** and locaed the URL under /send-message/ that looks like the following: \

```
https://<Your-Username>.api.stdlib.com/twilio-survey@dev/send-message/
```

Clicking on this URL will lead your survey to be deployed to all numbers that you have entered in the **Contacts** table. If everything goes according to plan, you should see a success message! If there was an issue, this will also be displayed here. Please note that only one question can be sent at a time, and this will always be the most recently added question that 1. has a wasSent value of 'false' (no green check mark) and 2. has a Status of **Pending**. All answers will be recorded for the most recent question that has been added with a wasSent value of 'true' (has a green check mark) and retains a status of **Pending**.

So when you feel you have ample replies, change the question Status to **Finished**, and then add a new question. Our workflow will take care of changing the wasSent status based on whether or not this message was ever delivered.

## That's It!
You're all set! Be sure to stay tuned for our next article by following [our blog](https://stdlib.com/blog) or following us on Twitter [@StdLibHQ](https://www.twitter.com/StdLibHQ).
