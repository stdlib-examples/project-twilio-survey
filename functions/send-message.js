const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for HTTP or Webhook request event
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async () => {

// Prepare workflow object to store API responses

let result = {};

// [Workflow Step 1]

console.log(`Running airtable.query[@0.3.3].select()...`);

result.selectContacts = await lib.airtable.query['@0.3.3'].select({
  table: `Contacts`
});

if (result.selectContacts.rows.length === 0) {
  return {'message': 'No contacts found. Please update your contacts table with valid contacts and try again.'};
}

// [Workflow Step 2]

console.log(`Running airtable.query[@0.3.3].select()...`);

result.selectQueryResult = await lib.airtable.query['@0.3.3'].select({
  table: `Questions`,
  where: [
    {
      wasSent__is: null,
      Status: `Pending`
    },
  ]
});

if (result.selectQueryResult.rows.length === 0) {
  return {'message': 'No valid questions found. Please check the questions table and try again.'};
} else if (result.selectQueryResult.rows[0].fields.Question === null) {
  return {'message': 'Whoops, looks like you left the question blank!' };
}

// [Workflow Step 3]
let seen = new Set();
let nums = result.selectContacts.rows.reduce((acc, cur) => {
  if (!seen.has(cur.fields.Number)) {
    acc.push(cur);
    seen.add(cur.fields.Number);
  }
  return acc;
}, []);

console.log(`Running twilio.messages[@0.1.0].create()...`);
for (let row of nums) {
  result.result = await lib.twilio.messages['@0.1.0'].create({
    from: null,
    to: `${row.fields.Number}`,
    body: `Your friend sent you a Twilio Survey:` + `\n` + `\n` + `${result.selectQueryResult.rows[0].fields.Question}`,
    mediaUrl: null
  }).catch(err => {
    console.log(`Oops, not a valid number!`);
  });
};

// [Workflow Step 4]

console.log(`Running airtable.query[@0.3.3].update()...`);

result.updateQueryResult = await lib.airtable.query['@0.3.3'].update({
  table: `Questions`, // required
  where: [
    {
      Question: `${result.selectQueryResult.rows[0].fields.Question}`
    }
  ],
  fields: {
    wasSent: true
  }
});
  return {'message': 'Message sent successfully to contacts.'};
};