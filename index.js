var express = require('express'),
    configure = require('./server/copypasta'),
    _ = require('underscore'),
    mongodb = require('./server/mongo_client'),
    app = express();

  app = configure(app);

  var server = app.listen(app.get('port'), function() {
    console.log('running on' + app.get('port'));

    mongodb.connect('mongodb://localhost:27017/oreilly', function() {
      console.log('Connected to MongoDB.');
    });
  });
