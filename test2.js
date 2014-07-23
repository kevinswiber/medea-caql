var medea = require('medea');
var query = require('./medea_query')(medea);

var db = medea();

db.open('./query_data', function() {
  db.put('kevin', JSON.stringify({ name: 'kevin', type: 'human', color: 'blue' }), function() {
    db.find('select name, type where color="red"', function(err, results) {
      console.log(results);
    });
  });
});
