const express = require("express");
const router = express.Router();
const querystring = require('querystring');
const { apiKey, getClientId, addDNSRecord, getDnsList } = require('../apiUtils');

// Route for handling the addition of a DNS record
router.post('/', async (req, res) => {
  //Sanitized input
  const domain = querystring.escape(req.body.domain);  
  const type = querystring.escape(req.body.type);
  const name = querystring.escape(req.body.name);
  const content = querystring.escape(req.body.content);
  const prio = querystring.escape(req.body.prio);


  try {
    const clientId = await getClientId(apiKey);
    const dnsRecord = await addDNSRecord(apiKey, clientId, domain, type, name, content, prio);
    const dnsList = await getDnsList(apiKey, clientId, domain);
    res.send(`

      <h1>DNS Record Status</h1>
      ${dnsRecord.status?(
        `<h5>The DNS record has been added successfully to the domain "${domain}".</h5>` 
        ):(
          `<h1>Error</h1>`
        )
      }
      <pre>${JSON.stringify(dnsRecord, null, 2)}</pre>
      <h1>DNS Records List</h1>
      <pre>${JSON.stringify(dnsList, null, 2)}</pre>
      <a href="/">Next</a>

    `);

  } catch (error) {
    res.send(`
      <h1>Error</h1>
      <p>${error.message}</p>
    `);
  }
});

module.exports = router;