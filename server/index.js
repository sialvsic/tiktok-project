const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const getRandomInt = require('./utils');

const port = process.env.port || 5002;
const url = `http://localhost:${port}`;
const ASSERT_PATH = '../assets';

app.get('/videos', (req, res) => {
  fs.readdir(path.join(__dirname, ASSERT_PATH), (err, files) => {
    if (err) {
      console.log(err);
    }

    files = files.filter(file => {
      return !file.includes('DS_Store');
    });

    const lists = [
      {
        url: `${url}/video/${files[0]}`,
      },
      {
        url: `${url}/video/${files[1]}`,
      },
      {
        url: `${url}/video/${files[2]}`,
      },
    ];

    res.send(lists);
  });
});

app.get('/video', (req, res) => {
  fs.readdir(path.join(__dirname, ASSERT_PATH), (err, files) => {
    if (err) {
      console.log(err);
    }

    files = files.filter(file => {
      return !file.includes('DS_Store');
    });

    const file = getRandomInt(0, files.length);

    res.send({
      url: `${url}/video/${files[file]}`,
    });
  });
});

app.get('/video/:name', (req, res) => {
  const fileName = req.params.name;

  const options = {
    root: path.join(__dirname, ASSERT_PATH),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  res.sendFile(fileName, options, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Sent:', fileName);
  });
});

app.listen(port, () => console.log(`Server app listening on port ${port}!`));
