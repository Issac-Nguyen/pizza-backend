const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
var cors = require('cors');
// const withAuth = require('./middleware');
const router = require('./src/router');
const db = require('./src/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors())

app.use('/api', router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const port =process.env.PORT || 8080;
(async() => {
  try {
    await db.init();
    await app.listen(port || 8080, () => {console.log('server listening on port' + port)});
    
  } catch(err) {
    console.error(err)
  }
  
})();

