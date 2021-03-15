const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config().parsed;
const cors = require('cors');
require('./defines');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// log func
// app.use((req, res, next) => {
//     let current_date = new Date();
//     console.log(`
//     ${current_date.getHours()}:${current_date.getMinutes()}
//     url: ${req.url}
//     method: ${req.method}`);
//     console.log(`body:`);
//     console.log(req.body);
//     next();
// });

require('./src/routes').forEach(routeName => {
    app.use(`/${routeName}`, require(`./src/routes/${routeName}.route`));
});

(async () => {
    await app.listen(process.env.PORT);
    console.log(`Server is listening on ${dotenv.PORT}`);
})();