const express = require("express");
const router = express.Router();
const { apiKey, getClientId, getDomainsList } = require('../apiUtils');


// Route for displaying the form to add a DNS record
router.get('/', async (req, res) => {

  try {
    const clientId = await getClientId(apiKey);
    const domainsListResponse = await getDomainsList(apiKey, clientId);

    // Generate the options base on a array
    function arrayToDropdwon (array){
      return array.map(e => `<option value="${e}">${e}</option>`).join('')
    };

    // Generate the options for the types dropdown
    const domainsList = domainsListResponse.map(domain => domain.name);
    const dropdownDomains = arrayToDropdwon(domainsList);

    // Generate the options for the types dropdown
    typesArray = ['A', 'AAAA', 'CNAME', 'SRV', 'MX', 'TXT', 'CAA'];
    const dropdownTypes = arrayToDropdwon(typesArray);

    // Generate the options for the prio dropdown
    prioArray = ['0','1','5','10','15','20','30','40','50','60','70','80','90'];
    const dropdownPrio = arrayToDropdwon(prioArray);

  

    res.send(`
      <h1>DNS Zone Record</h1>


      <form method="POST" action="/add-dns-zone">
        <h2>Add a new DNS Zone</h2>
        <input type="text" id="domain" name="domain" placeholder="Domain" required><br><br>
        <input type="submit" value="Add DNS Zone">
      </form>


      <form method="POST" action="/add-dns-record">
        <h2>Add DNS Record</h2>
        <select id="domain" name="domain" required>
          <option value="">-- Select a DNS Zone --</option>
          ${dropdownDomains}
        </select><br><br>

        <input type="text" id="name" name="name" placeholder="Record Name" required>

        <select id="type" name="type" required>
          <option value="">-- Select Type --</option>
          ${dropdownTypes}
        </select>



        <select id="prio" name="prio">
          <option value="">-- Select Priority --</option>
          ${dropdownPrio}
        </select>

        <input type="text" id="content" name="content" placeholder="Record Address" required><br><br>
        
        <input type="submit" value="Add DNS Record">
      </form>

    `);

  } catch (error) {
    res.send(`
      <h1>Error</h1>
      <p>${error.message}</p>
    `);
  }

});

module.exports = router;

