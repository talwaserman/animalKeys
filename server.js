/**
 * Created by Tal Waserman on 19/02/15.
 */
var http = require('http'),
    app = require('./app')();

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port' + app.get('port'));
});