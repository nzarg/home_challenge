const express = require("express");
const router = express.Router();
const querystring = require('querystring');
const { apiKey, getClientId, addDomain } = require('../apiUtils');


// Route for handling the addition of a DNS record
router.post('/', async (req, res) => {
  
  //Sanitized input
  const domain = querystring.escape(req.body.domain);

  try {
    const clientId = await getClientId(apiKey);
    const addDomainResponse = await addDomain(apiKey, clientId, domain)
    
    //Renders views/index.ejs
    res.render("pages/add-dns-zone", {
    clientId: clientId,
    domain: domain,
    addDomainResponse: addDomainResponse
    })

  } catch (error) {
    res.render("pages/error", {
      error: error
    })
  }
});


module.exports = router;

