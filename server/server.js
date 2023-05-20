const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const listRouter = require('./routes/listRouter.js');

app.use(bodyParser.urlencoded({extedned: true}));
app.use(express.static('server/public'));

//Routes
app.use('/list', listRouter);

// Start listening for request
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});

}
