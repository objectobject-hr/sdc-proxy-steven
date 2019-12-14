// jshint esversion:6
const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3003;
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(`/mlistings/:id`, (req, res) => {
    axios.get(`http://localhost:3000/mlistings/${req.params.id}`).then(data => res.status(200).send(data.data)).catch(err => res.status(404).send(err));
});

app.get(`/amenities/:id`, (req, res) => {
    axios.get(`http://localhost:3001/amenities/${req.params.id}`)
    .then((docs) => res.status(200).send(docs.data[0])).catch(err => res.status(404).send(err));
});

app.get(`/dates/:id`, (req, res) => {
    axios.get(`http://localhost:3000/dates/${req.params.id}`).then(data => res.status(200).send(data.data)).catch(err => res.status(404).send(err));
});

app.get(`/listings/search`, (req, res) => {
    axios.get(`http://localhost:3000/listings/search`, {
        params: {query: req.query.query}
      }).then(data => res.status(200).send(data.data)).catch(err => res.status(404).send(err));
});

app.get(`/reviews/:id`, (req, res) => {
    axios.get(`http://localhost:3004/reviews/${req.params.id}`).then(data => res.status(200).send(data)).catch(err => res.status(404).send(err));
});

app.get('/carousel-service/:id', (req, res) => {
    axios.get(`http://localhost:3002/carousel-service/${req.params.id}`).then(data => res.status(200).send(data.data[0])).catch(err => res.status(404).send(err));
});

// const servers = [
//     { route: '/mlistings', location: `http://localhost:3000/mlistings` },
//     { route: '/amenities', location: `http://localhost:3001/amenities`},
//     { route: '/dates', location: `http://localhost:3000/dates` },
//     { route: '/listings/search', location: `http://localhost:3000/listings/search`},
//     { route: `/reviews`, location: `http://localhost:3004/reviews`}
//   ];
  
//   for (server of servers) {
//     app.use(
//       server.route,
//       proxy({
//         target: server.location,
//         pathRewrite: (path, req) => {
//           return path
//             .split('/')
//             .slice(2)
//             .join('/')
//         }
//       })
//     )
//   }

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// app.get('/:id', (req, res) => {
//     axios.get (4x).then(
//         alldate
//         res.send(allData)
//     )
// })




