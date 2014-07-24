var medea = require('medea');

require('./medea_caql')(medea);

var companies = medea();

var entries = [
  { name: 'Postini', founded_year: 1999, total_money_raised: '$0' },
  { name: 'Digg', founded_year: 2004, total_money_raised: '$45M' },
  { name: 'Airbnb', founded_year: 2007, total_money_raised: '$120M' },
  { name: 'TripIt', founded_year: 2006, total_money_raised: '$13.1M' },
  { name: 'Twitter', founded_year: 2006, total_money_raised: '$1.16B' },
  { name: 'Spotify', founded_year: 2006, total_money_raised: '$183M' },
  { name: 'Airbnb', founded_year: 2008, total_money_raised: '$776.4M' }
];

var query =   'select name, founded_year, total_money_raised as worth '
            + 'where founded_year >= 1999 and name not like "%air%" '
            + 'order by founded_year desc, name';

companies.open('./company_data', function() {
  var batch = companies.createBatch();

  var idCounter = 1;
  entries.forEach(function(entry) {
    batch.put(idCounter++, JSON.stringify(entry));
  });

  companies.write(batch, function(err) {
    companies.find(query, function(err, results) {
      console.log(results);
    });
  });
});
