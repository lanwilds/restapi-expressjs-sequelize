const express = require('express'); // Express object
const cors = require('cors'); // setup Cross Origin Resource Sharing
const logger = require('morgan'); // monitor http requests in terminal
const bodyParser = require('body-parser'); //grab form request body
require('dotenv').config(); // parse .env file to get configs
// Sequelize ORM
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('fickles', 'phpmyadmin', '12121212', {
  host: 'localhost',
  dialect:'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
//attempting to connect
sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL Connected Success.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//Initialize App
const app = express();

//Application Imports
// const User = sequelize.import('./models/user')
// module.exports = User;

//Import Middlewares
// const authMiddleware =  require('./middlewares/auth-middleware');

//Import Routes
const apiRoutes =  require('./routes/api');
// const authRoutes =  require('./routes/auth');

//Middlewares
app.use(cors());
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/',async(req,res)=>{
  return res.status(200).json({
    message:"Welcome to ExpressJS."
  });

});

//Register Routes
app.use('/api',apiRoutes);
// app.use('/api',authMiddleware.verifyJWT_MW,apiRoutes);

//catch http error and handle
app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Express Error handler
app.use((err,req,res,next)=>{
    
    const error = process.env.DEBUG ? err : {};
    const status = err.status || 500;

    //Respond to client
    res.status(status).json({
        message:error.message
    });

    //Respond to dev
    console.error(err)
})

const port = process.env.PORT;
app.listen(port, () =>{
	console.log("App Listening on "+port)
});