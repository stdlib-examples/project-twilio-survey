const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for Twilio sms.received event
* @param {object} event
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async (event) => {

  
// Prepare workflow object to store API responses
// Prepare workflow object to store API responses

let result = {};

// [Workflow Step 1]

console.log(`Running airtable.query[@0.3.4].select()...`);

result.selectQuestion = await lib.airtable.query['@0.3.4'].select({
  table: `Questions`,
  where: [
    {
      wasSent__is: true,
      Status__is: `Pending`
    }
  ]
});

// [Workflow Step 2]

let n = event.From.split('+');
let num = parseInt(n[1]);

result.selectContact = await lib.airtable.query['@0.3.4'].select({
  table: `Contacts`,
  where: [
    {
      Number: num
    }
  ]
});

// [Workflow Step 3]

let contact = result.selectContact.rows[0].id;
let question = result.selectQuestion.rows[0].id;

repliesQueryResult = await lib.airtable.query['@0.3.4'].select({
  table: `Replies`,
  where: [
    {
      Respondent__contains: contact,
      Question__contains: question
    }
  ]
});

if (repliesQueryResult.rows.length === 0) {
  result.insertQueryResult = await lib.airtable.query['@0.3.4'].insert({
    table: `Replies`,
    fields: {
      Reply: `${event.Body}`,
      Respondent: [contact],
      Question: [question]
    }
  });

  await lib.twilio.messages['@0.1.0'].create({
    from: null,
    to: `${event.From}`,
    body: `Thanks for submitting your reply! Your response has been logged.`,
    mediaUrl: null
  });
};
  return result;
};