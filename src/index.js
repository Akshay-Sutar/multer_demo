const express = require('express');
const path = require('path');

const config = require('./config');

process
.on('uncaughtException', (error) => {
    console.error('Promise unhandled error -', error.message);
    process.exit(1);
})
.on('unhandledRejection', (reason, promise) => {
    console.error('Promise unhandled error -', reason.message);
    process.exit(1);
})

const app = express();
app.use(express.json()); // req.body
app.use(express.urlencoded({
    extended: true
})); // parses application/x-www-form-urlencoded content and stores in req.body

// Set views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

// Mount routes module
app.use(require('./routes'));

app.use('*', (req, res, next) => {
    return res.render('pages/not-found', { originalUrl : req.originalUrl });
});

app.use((err, req, res, next) => {
    return res.render('pages/error', { message: err.message, stack: err?.stack });
});

const port = parseInt(process.env.PORT, 10) || config.appPort;
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
