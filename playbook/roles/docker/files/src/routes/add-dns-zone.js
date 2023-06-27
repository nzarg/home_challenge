const express = require("express");
const router = express.Router();
const { apiKey, getClientId, addDomain } = require('../apiUtils');


// Route for handling the addition of a DNS record
router.post('/', async (req, res) => {
  const domain = req.body.domain;

  try {
    const clientId = await getClientId(apiKey);
    const addDomainResponse = await addDomain(apiKey, clientId, domain)
    res.send(`

      <h1>Dns Zone Added</h1>
      ${addDomainResponse.status? (
        `<p>The Domain has been added successfully: "${domain}".</p>`):(
          `<p>${addDomainResponse.msg}".</p>`
        )
      }
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

