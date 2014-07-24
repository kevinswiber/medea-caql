var JSCompiler = require('./compiler');

module.exports = function(Medea) {
  Medea.prototype.find = function(query, cb) {
    var compiler = new JSCompiler();

    compiler.compile(query);

    var options = {
      map: function(key, value, emit) {
        var result;
        if (result = compiler.mapOne(JSON.parse(value.toString()))) {
          emit('value', result);
        };
      },
      reduce: function reduce(key, values) {
        return compiler.reduce(values);
      }
    };

    this.mapReduce(options, function(values) {
      cb(null, values || []);
    });
  };
};
