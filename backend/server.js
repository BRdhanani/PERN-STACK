const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`listening on port ${PORT}`))