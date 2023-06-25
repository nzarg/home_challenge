const express = require('express');
const { URLSearchParams } = require('url');
const app = express();
const axios = require('axios');


// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

const API_KEY = 'f5567a857d478d9cc8bd96e0115f8c2d07e9c68ff4fb1cd4a4f072b0629cd679';

// Function to retrieve the client ID
function getClientId(apiKey) {
  return axios.get(`https://api.sitehost.nz/1.2/api/get_info.json?apikey=${apiKey}`)
    .then(response => {
      const { status, return: data } = response.data;
      if (status && data && data.client_id) {
        return data.client_id;
      } else {
        throw new Error('Failed to retrieve client ID');
      }
    })
    .catch(error => {
      throw new Error('Failed to retrieve client ID');
    });
}

// Function to add a Domain 
function addDomain(clientId, domain) {
  const data = new URLSearchParams();
  data.append('apikey', API_KEY);
  data.append('client_id', clientId);
  data.append('domain', domain);

  const options = {
    url: 'https://api.sitehost.nz/1.2/dns/create_domain.json',
    method: 'POST',
    data: data.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return axios(options)
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to add Domain');
    });
}

// Function to add a DNS record
function addDNSRecord(clientId, domain) {
  const data = new URLSearchParams();
  data.append('apikey', API_KEY);
  data.append('client_id', clientId);
  data.append('domain', domain);
  data.append('type', 'A');
  data.append('name', 'subdomain.example.nz');
  data.append('content', '1.1.1.1');
  data.append('prio', '0');

  const options = {
    url: 'https://api.sitehost.nz/1.2/dns/add_record.json',
    method: 'POST',
    data: data.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return axios(options)
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to add DNS record');
    });
}


// Function to list DNS records NOT WORKING
function getDnsList(apiKey, clientId, domain) {
  const url = `https://api.sitehost.nz/1.2/dns/list_records.json?apikey=${apiKey}&client_id=${clientId}&domain=${domain}`;

  const options = {
    method: 'GET',
    url,
  };

  return axios(options)
    .then(response => {
      const { status, return: responseData } = response.data;
      if (status && responseData) {
        return responseData;
      } else {
        throw new Error('Failed to retrieve DNS records');
      }
    })
    .catch(error => {
      throw new Error('Failed to retrieve DNS records');
    });
}


// Function to list Domains
function getDomainsList(apiKey, clientId) {
  const url = `https://api.sitehost.nz/1.2/dns/list_domains.json?apikey=${apiKey}&client_id=${clientId}&filters[domain]=.com`;

  const options = {
    method: 'GET',
    url,
  };

  return axios(options)
    .then(response => {
      const { status, return: responseData } = response.data;
      if (status && responseData) {
        return responseData.data;
      } else {
        throw new Error('Failed to retrieve List of Domains');
      }
    })
    .catch(error => {
      throw new Error('Failed to retrieve List of Domains');
    });
}


// Route for displaying the form to add a DNS record
app.get('/', (req, res) => {
  res.send(`
    <h1>Add DNS Record</h1>
    <form method="POST" action="/add-record">
      <label for="domain">Domain:</label>
      <input type="text" id="domain" name="domain" required><br><br>
      <input type="submit" value="Add Record">
    </form>
  `);
});

// Route for handling the addition of a DNS record
app.post('/add-record', async (req, res) => {
  const domain = req.body.domain;

  try {
    const clientId = await getClientId(API_KEY);
    const addDomainResponse = await addDomain(clientId, domain)
    const dnsRecord = await addDNSRecord(clientId, domain);
    const dnsList = await getDnsList(API_KEY, clientId, domain);
    const domainsList = await getDomainsList(API_KEY, clientId);
    res.send(`
      <h1>Client ID</h1>
      <p>The retrieved client ID is: ${clientId}</p>
      <pre>${JSON.stringify(clientId, null, 2)}</pre>
      <h1>Domain Added</h1>
      <p>The Domain has been added successfully: "${domain}".</p>
      <pre>${JSON.stringify(addDomainResponse, null, 2)}</pre>
      <h1>Domains List</h1>
      <pre>${JSON.stringify(domainsList, null, 2)}</pre>
      <h1>DNS Record Added</h1>
      <p>The DNS record has been added successfully to the domain "${domain}".</p>
      <pre>${JSON.stringify(dnsRecord, null, 2)}</pre>
      <h1>DNS Records List</h1>
      <pre>${JSON.stringify(dnsList, null, 2)}</pre>

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
  console.log('Server is running on port 3000');
});
