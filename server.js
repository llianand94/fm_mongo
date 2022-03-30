const http = require('http');
const express = require('express');
const {MONGOHOST,MONGOPORT,DBNAME} = require('./configMongoDB.json');

mongoose.connect(`mongodb://${MONGOHOST}:${MONGOPORT}/${DBNAME}`).catch(error => {
  console.log(error);
  process.exit(1);
});

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log('Server started at port ' + PORT);
});
