const express = require("express");
const router = express.Router();
const querystring = require('querystring');
const { getClientId, addDNSRecord, getDnsList } = require('../apiUtils');
const { apiKey } = require('../apiKey');

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
    const dnsRecordResponse = await addDNSRecord(apiKey, clientId, domain, type, name, content, prio);
    const dnsList = await getDnsList(apiKey, clientId, domain);
    
    //Renders views/index.ejs
    res.render("pages/add-dns-record", {
    clientId: clientId,
    domain: domain,
    dnsRecordResponse: dnsRecordResponse,
    dnsList: dnsList,
  })

  } catch (error) {
    res.render("pages/error", {
      error: error
    })
  }
});

module.exports = router;