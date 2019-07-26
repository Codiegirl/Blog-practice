import express from 'express'
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.json()); /*parses the json object and adds a body property to the request perameter of whatever the matching route is*/

app.get('/hello', (req, res) => res.send('Hello'));
app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`));
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));
app.listen(8000, () => console.log('Listening on port 8000'));