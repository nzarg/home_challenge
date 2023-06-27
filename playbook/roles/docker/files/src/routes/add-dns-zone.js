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
    addDomainResponse: addDomainResponse,
    stringResponse: JSON.stringify(addDomainResponse, null, 2)
  })

  } catch (error) {
    res.send(`
      <h1>Error</h1>
      <p>${error.message}</p>
    `);
  }
});


module.exports = router;

