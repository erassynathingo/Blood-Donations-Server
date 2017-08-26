/**
 * @author Erastus Nathingo <contact@erassy.com>
 * @description Entry Point for Blood_Donations_Server
 */

let express = require('express'),
    http = require('http'),
    config = require('./config'),
    connect = require('connect'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    headers = require('./middleware/headers'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    errorNotify = require('./middleware/error.middleware'),
    Logger = require('./libraries/logger.lib'),
    logger = new Logger(),
    session = require('express-session'),
    responseTime = require('response-time'),
    cors = require('cors'),
    corsOpt = require('./middleware/cors.options');

// =================   ROUTES DEFINITIONS ================ //

auth = require('./routes/authentication.route'),
    users = require('./routes/users'),
    donate = require('./routes/donate'),
    tests = require('./routes/unitTests')

let app = express(),
    port = process.env.PORT || config.port,
    server = http.createServer(app).listen(port, function () {
        console.log('Serving Blood_Donations_Server on port ' + port)
    })

config.env === 'development' ? app.use(errorhandler({
    log: errorNotify.notification,
    dumpExceptions: true,
    showStack: true
})) : null

app.use(session(config.auth))
    .set('Title', 'Blood_Donations_Server')
    .use(morgan('dev'))
    .use(headers)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.raw({
        limit: '50mb'
    }))
    .use(responseTime())
    /* Security*/
    .use(helmet())
    .use(cors(corsOpt.getCORSoptions()))

    // ================  ROUTERS ====================>>//
    .use('/auth', auth)
    .use('/users', users)
    .use('/donate', donate)
    .use('/tests', tests)