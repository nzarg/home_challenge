const axios = require('axios');
const { URLSearchParams } = require('url');
const apiKey = 'f5567a857d478d9cc8bd96e0115f8c2d07e9c68ff4fb1cd4a4f072b0629cd679';

// Function to retrieve the client ID
async function getClientId(apiKey) {
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
async function addDomain(apiKey, clientId, domain) {
  const data = new URLSearchParams();
  data.append('apikey', apiKey);
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
async function addDNSRecord(apiKey, clientId, domain, type, name, content, prio = '0') {
  const data = new URLSearchParams();
  data.append('apikey', apiKey);
  data.append('client_id', clientId);
  data.append('domain', domain);
  data.append('type', type);
  data.append('name', `${name}.${domain}`);
  data.append('content', content);
  data.append('prio', prio);

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


// Function to list DNS records
async function getDnsList(apiKey, clientId, domain) {
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
async function getDomainsList(apiKey, clientId) {
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

module.exports = {
  apiKey,
  getClientId,
  addDomain,
  addDNSRecord,
  getDnsList,
  getDomainsList,
};