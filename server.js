const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use('/files', express.static("files"));
app.use(cors());
app.use(bodyParser.json())

require("./config/mongoose.js")(app);
require('./routeHandler')(app)

app.get('/', (req, res) => {
    res.json({
        message: 'Arise MERN Developers'
    });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Application is Running on ${port}`);
});