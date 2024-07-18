const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const routing = require('./routing');

app.use(express.json());
app.use('/api', routing);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
