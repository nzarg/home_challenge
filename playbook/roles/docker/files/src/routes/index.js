const express = require("express");
const router = express.Router();
const { apiKey, getClientId, getDomainsList } = require('../apiUtils');


// Route for displaying the form to add a DNS record
router.get('/', async (req, res) => {

  try {
    const clientId = await getClientId(apiKey);
    const domainsListResponse = await getDomainsList(apiKey, clientId);

    // Generate the options for the types dropdown
    const domainsArray = domainsListResponse.map(domain => domain.name);

    // Generate the options for the types dropdown
    const typesArray = ['A', 'AAAA', 'CNAME', 'SRV', 'MX', 'TXT', 'CAA'];

    // Generate the options for the prio dropdown
    const prioArray = ['0','1','5','10','15','20','30','40','50','60','70','80','90'];

  
    //Renders views/index.ejs
    res.render("index", {
      domainsArray: domainsArray,
      typesArray: typesArray,
      prioArray: prioArray
    })

  } catch (error) {
    res.send(`
      <h1>Error</h1>
      <p>${error.message}</p>
    `);
  }

});

module.exports = router;

