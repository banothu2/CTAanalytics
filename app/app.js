var express = require('express');
var path = require('path');
var app = express();
var mysql = require('mysql2');
var verbose = process.env.NODE_ENV != 'test'

// ---------- App Configuration
    app.configure(function () {
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.session({ secret: 'God Of War' }));
        app.use(express.methodOverride());
        //app.use(flash());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));

    });

    app.configure('development', function () {
        app.use(express.errorHandler());
    });

    //app.engine('html', require('ejs').renderFile);

/* App.map set up start */
  app.map = function(a, route){
    route = route || '';
    for (var key in a) {
      switch (typeof a[key]) {
        // { '/path': { ... }}
        case 'object':
          app.map(a[key], route + key);
          break;
        // get: function(){ ... }
        case 'function':
          if (verbose) console.log('%s %s', key, route);
          app[key](route, a[key]);
          break;
      }
    }
  };
/* App.map set up end */

/* public variables start */ 
  var connection;
/* public variables end */

/* map functions start */
var DBuser = 'root';
var DBhost = '127.0.0.1';
var DBpassword = '';

  var init = {
    requestConnection: function(req, res){
        res.render('connection');
    }, 
    createConnection: function(req, res){
      var apple = 0;

      connection = mysql.createConnection({ 
          user: DBuser,//req.body.username, 
          host: DBhost, //req.body.hostname, 
          password: DBpassword//req.body.password
      });
      connection.connect(function(err) {
        // connected! (unless `err` is set)
        if(err){
          res.redirect('/');
        } else {
          connection.query('SHOW Databases', function(err, databaseList){
            connection.query('SELECT * FROM '+ databaseList[0].Database + '.TABLES',  function(err, tables){
              res.redirect('/connected_rider/ridership/ridership');
              //res.redirect('/connected/' + databaseList[0].Database + '/' + tables[0].TABLE_NAME );
            });
          });
        }
      });
    },
    connected: function(req, res){
      var toDatabase = req.params.toDatabase;
      var toTable = req.params.toTable;

      connection.query('SHOW Databases', function(err, databaseList){

          connection.query('USE ' + toDatabase);
          connection.query('SELECT * FROM information_schema.TABLES',  function(err, tables){

                  var tablesList = Object_keys(tables[0]);
                  function Object_keys(obj) {
                      var tablesList = [], name;
                      for (name in obj) {
                          if (obj.hasOwnProperty(name)) {
                              tablesList.push(name);
                          }
                      }
                      return tablesList;
                  }

            connection.query('SELECT * FROM '+ toTable + '', function(err, rows){

                  var keys = Object_keys(rows[0]);
                  function Object_keys(obj) {
                      var keys = [], name;
                      for (name in obj) {
                          if (obj.hasOwnProperty(name)) {
                              keys.push(name);
                          }
                      }
                      return keys;
                  }

                res.render('users', {
                                      rows : rows,
                                      keys: keys, 
                                      databases: databaseList, 
                                      tables: tables,
                                      databaseName: toDatabase,
                                      tableName: toTable

                                    }
                );

            })


          });

      });
    }, 
    connected_rider: function(req, res){
      var toDatabase = req.params.toDatabase;
      var toTable = req.params.toTable;

      //connection.query('SHOW Databases', function(err, databaseList){

          connection.query('USE ' + toDatabase);
          // connection.query('SELECT * FROM information_schema.TABLES',  function(err, tables){

          //         var tablesList = Object_keys(tables[0]);
          //         function Object_keys(obj) {
          //             var tablesList = [], name;
          //             for (name in obj) {
          //                 if (obj.hasOwnProperty(name)) {
          //                     tablesList.push(name);
          //                 }
          //             }
          //             return tablesList;
          //         }

            connection.query('SELECT * FROM '+ toTable + ' LIMIT 5', function(err, rows){

                  var keys = Object_keys(rows[0]);
                  function Object_keys(obj) {
                      var keys = [], name;
                      for (name in obj) {
                          if (obj.hasOwnProperty(name)) {
                              keys.push(name);
                          }
                      }
                      return keys;
                  }

                res.render('RiderAnalytics', {
                                      rows : rows,
                                      keys: keys, 
                                      //databases: databaseList, 
                                      //tables: tables,
                                      databaseName: toDatabase,
                                      tableName: toTable

                                    }
                );

            })


          //});

      //});
    },
    connected_api: function(req, res){
      var toDatabase = req.params.toDatabase;
      var toTable = req.params.toTable;
      var queryRequested = req.params.query;
      console.log(queryRequested);
      connection.query('USE ' + toDatabase);

        var sql_for_longest_bus_route_by_number_of_stops = "SELECT MAX(number_of_stops) as stops, route_number FROM  ( SELECT count(stop_id) AS number_of_stops, first as route_number FROM  (  SELECT strSplit(routes, ',', 1) as first, stop_id FROM ridership UNION ALL  SELECT strSplit(routes, ',', 2) as second, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 3) as third, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 4) as fourth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 5) as fifth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 6) as sixth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 7) as seventh, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 8) as eight, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 9) as nineth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 10) as tenth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 11) as eleventh, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 12) as twelfth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 13) as thirteenth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 14) as fourteenth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 15) as fifteenth, stop_id  FROM ridership ORDER BY first) AS rider_union WHERE first <> '' GROUP BY first ORDER BY number_of_stops DESC) AS testing";
        var sql_for_most_valuable_bus_stop =  "SELECT stop_id, on_street, cross_street, MAX(number_of_routes) as number_of_routes FROM (SELECT stop_id, on_street, cross_street, (LENGTH(routes) - LENGTH(REPLACE(routes, ',', '')) + 1) AS 'number_of_routes' FROM ridership ORDER BY number_of_routes DESC) AS Testing";
        var sql_for_most_valuable_bus_stop_with_location = "SELECT stop_id, on_street, cross_street, location, (LENGTH(routes) - LENGTH(REPLACE(routes, ',', '')) + 1) AS 'number_of_routes' FROM ridership ORDER BY number_of_routes DESC LIMIT 20";
        var scatter_routes_boardings_alightings_greater = "SELECT (LENGTH(routes) - LENGTH(REPLACE(routes, ',', '')) + 1) AS 'number_of_routes', boardings, alightings from ridership where alightings > 1500 ORDER BY boardings DESC";
        var scatter_routes_9_boarding_and_alightings = "SELECT boardings, alightings from ridership where routes = 9 ORDER BY boardings DESC";
        var scatter_routes_boardings_greater_alightings = "SELECT (LENGTH(routes) - LENGTH(REPLACE(routes, ',', '')) + 1) AS 'number_of_routes', boardings, alightings from ridership where boardings > 1000 ORDER BY boardings DESC";
        var horizontal_bus_stops_by_route = " SELECT * FROM  (SELECT count(stop_id) AS number_of_stops, first as route_number FROM  (  SELECT strSplit(routes, ',', 1) as first, stop_id FROM ridership UNION ALL  SELECT strSplit(routes, ',', 2) as second, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 3) as third, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 4) as fourth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 5) as fifth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 6) as sixth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 7) as seventh, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 8) as eight, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 9) as nineth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 10) as tenth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 11) as eleventh, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 12) as twelfth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 13) as thirteenth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 14) as fourteenth, stop_id  FROM ridership UNION ALL  SELECT strSplit(routes, ',', 15) as fifteenth, stop_id  FROM ridership ORDER BY first) AS rider_union WHERE first <> '' GROUP BY first ORDER BY number_of_stops DESC) as Test WHERE number_of_stops > 200 OR number_of_stops < 5";
        var list_bus_most_frequented_stops = " SELECT stop_id, on_street, cross_street, (LENGTH(routes) - LENGTH(REPLACE(routes, ',', '')) + 1) AS 'number_of_routes' FROM ridership ORDER BY number_of_routes DESC LIMIT 20";
      
      if(queryRequested == 'mapRoute126'){
          connection.query('SELECT on_street, cross_street, location, routes FROM '+ toTable + ' WHERE routes = 126 ORDER BY stop_id', function(err, rows){
                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      } else if (queryRequested == 'LongestBusRoute'){

          connection.query(sql_for_longest_bus_route_by_number_of_stops, function(err, rows){
                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      } else if (queryRequested == 'MostValuableBusStop'){

          connection.query(sql_for_most_valuable_bus_stop, function(err, rows){
                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      } else if (queryRequested == 'MostValuableBusStopWithLocation'){

          connection.query(sql_for_most_valuable_bus_stop_with_location, function(err, rows){
                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      } else if (queryRequested == 'scatterRoutesBoardingsAlightingsLGreater'){

          connection.query(scatter_routes_boardings_alightings_greater, function(err, rows){
                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      } else if (queryRequested == 'scatterRoute9BoardingAndAlightings'){

          connection.query(scatter_routes_9_boarding_and_alightings, function(err, rows){
                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      } else if (queryRequested == 'scatterRoutesBoardingsAlightingsBGreater'){

          connection.query(scatter_routes_boardings_greater_alightings, function(err, rows){
                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      } else if (queryRequested == 'busStopsByRoute'){

          connection.query(horizontal_bus_stops_by_route, function(err, rows){
                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      } else if (queryRequested == 'mostFrequentedStops'){

          connection.query(list_bus_most_frequented_stops, function(err, rows){
                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      } else {
          connection.query('SELECT * FROM '+ toTable + ' LIMIT 5', function(err, rows){
                  var keys = Object_keys(rows[0]);
                  function Object_keys(obj) {
                      var keys = [], name;
                      for (name in obj) {
                          if (obj.hasOwnProperty(name)) {
                              keys.push(name);
                          }
                      }
                      return keys;
                  }

                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      }
    }
  }

  var query = {
    open: function(req, res){
      var toDatabase = req.params.toDatabase;
      var toTable = req.params.toTable;
      var queryRequested = req.params.query;

      connection.query('USE ' + toDatabase);

      connection.query(queryRequested, function(err, rows){
            res.contentType('json');
            res.send({
                data: JSON.stringify(rows)
            })

        })
    }
  }

  var gmap = {
    outlinepath: function(req, res){
      var toDatabase = req.params.toDatabase;
      var toTable = req.params.toTable;
      var queryRequested = req.params.query;
          connection.query('SELECT on_street, cross_street, location, routes FROM '+ toTable + ' WHERE routes = '+ queryRequested +' ORDER BY stop_id', function(err, rows){
                res.contentType('json');
                res.send({
                    data: JSON.stringify(rows)
                })

            })
      // }
    }
  }
/*

var db_config = {
  host: 'engr-cpanel-mysql.engr.illinois.edu',
    user: 'banothu2_fuck',
    password: 'password!'
};

var connectionD;

function handleDisconnect() {
  connectionD = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connectionD.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connectionD.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
*/

/*
  var users = {
    list: function(req, res){
      res.send('user list');
    },

    get: function(req, res){
      res.send('user ' + req.params.uid);
    },

    del: function(req, res){
      res.send('delete users');
    }
  };

  var pets = {
    list: function(req, res){
      res.send('user ' + req.params.uid + '\'s pets');
    },

    del: function(req, res){
      res.send('delete ' + req.params.uid + '\'s pet ' + req.params.pid);
    }
  };
*/
/* map functions end */

/* map path start */
  app.map({
    '/': {
      get: init.createConnection
      //get: init.requestConnection
    }, 
    '/query/:toDatabase/:toTable/:query':{
      get: query.open
    },
    '/map/:toDatabase/:toTable/:query':{
      get: gmap.outlinepath
    },
    '/api/:toDatabase/:toTable/:query':{
      get: init.connected_api
    },
    '/connected/:toDatabase/:toTable': {
      get: init.connected,
      post: init.connected
    }, 
    '/connected_rider/:toDatabase/:toTable': {
      get: init.connected_rider,
      post: init.connected_rider
    }, 
    '/request/createConnection': {
      post: init.createConnection
    }
  });
/* map path start */

/*
var connection = mysql.createConnection({ 
		user: 'banothu2_fuck', 
		host: 'engr-cpanel-mysql.engr.illinois.edu', 
		
		password: 'password!'
});
*/

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/createTable', function(req, res){
	connection.query('CREATE TABLE test (columnOne varchar(255), columnTwo varchar(255));', function(err, response){
		console.log("creating table");
		res.redirect('/insert');
	});

})			

app.get('/insert', function(req, res){
  connection.query('INSERT INTO test(columnOne, columnTwo) VALUES ("hello", "bye")', function(err, rows){
  	res.redirect('/')
  });
});

app.get('/users', function(req, res){
  connection.query('USE banothu2_hw2');
  connection.query('SELECT * FROM countries', function(err, rows){

        var keys = Object_keys(rows[0]);
        function Object_keys(obj) {
            var keys = [], name;
            for (name in obj) {
                if (obj.hasOwnProperty(name)) {
                    keys.push(name);
                }
            }
            return keys;
        }

	console.log(keys)
  	console.log(rows);
    res.render('users', {users : rows, keys: keys});
  });
});

app.get('/', function(req, res){
  res.render('connection');
});




app.listen(app.get('port'));

console.log('Express server listening on port ' + app.get('port'));