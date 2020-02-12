const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello from the server side...');  
});

app.post('/register', (req, res) => {
	console.log(req.body);
	fs.readFile(path.join(__dirname, './entrants/data.json'), (err, data) => {
		if (err) console.log(err);
		const registerUser = JSON.parse(data);
		registerUser.push(req.body);
		fs.writeFile(path.join(__dirname, './entrants/data.json'), JSON.stringify(registerUser, null, 2), (err) => {
			if (err) console.log(err);
		});
		res.send('Registered!');
	}); 
});

app.listen(3000, () => console.log('Server running on port 3000!'));