const express = require('express');
const app = express();
const { getClientId, addDomain, addDNSRecord, getDnsList, getDomainsList } = require('./apiUtils');

const apiKey = 'f5567a857d478d9cc8bd96e0115f8c2d07e9c68ff4fb1cd4a4f072b0629cd679';

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Route for displaying the form to add a DNS record
app.get('/', async (req, res) => {

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

// Route for handling the addition of a DNS record
app.post('/add-dns-zone', async (req, res) => {
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

// Route for handling the addition of a DNS record
app.post('/add-dns-record', async (req, res) => {
  const domain = req.body.domain;
  const type = req.body.type;
  const name = req.body.name;
  const content = req.body.content;
  const prio = req.body.prio;

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

// Start the server
app.listen(80, () => {
  console.log('Server is running on port 80');
});