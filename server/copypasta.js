var path = require('path'),
    routes = require('./routes'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan');

module.exports = function(app) {
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'handlebars');

  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts'
  }).engine);

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser('to-play-us-out'));
  app.use(session({
    secret: 'to-play-us-out',
    saveUninitialized: true,
    resave: true
  }));

  app.use('/public/', express['static'](path.join(__dirname, '/../public')))

  routes.initialize(app, new express.Router());

  return app;
}
