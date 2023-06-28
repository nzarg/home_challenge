const express = require('express');
const app = express();
const path = require('path');
const addDnsRouter = require('./routes/add-dns-record')
const addDomainRouter = require('./routes/add-dns-zone')
const indexRouter = require('./routes/index')

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'src/public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

//Middleware view engine to render ejs files
app.set("view engine", "ejs")

//Routing
app.use('/', indexRouter);

app.use('/add-dns-record', addDnsRouter);

app.use('/add-dns-zone', addDomainRouter);


// Start the server
app.listen(80, () => {
  console.log('Server is running on port 80');
});
