const express = require('express');

const config = require('./config/config');
const router = require('./routes');

const app = express();

app.set('trust proxy', 1);

require('./config/expressConfig')(app);
require('./config/mongooseConfig')(app);

app.use('/api', router);

app.listen(config.PORT, () => console.log(`Server is listening on ${config.PORT}`));