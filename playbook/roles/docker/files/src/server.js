const express = require('express');
const app = express();

const addDnsRouter = require('./routes/add-dns-record')
const addDomainRouter = require('./routes/add-dns-zone')
const indexRouter = require('./routes/index')

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

//Routing
app.use('/', indexRouter);

app.use('/add-dns-record', addDnsRouter);

app.use('/add-dns-zone', addDomainRouter);


// Start the server
app.listen(80, () => {
  console.log('Server is running on port 80');
});
