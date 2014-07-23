var JSCompiler = require('./compiler');

module.exports = function(Medea) {
  Medea.prototype.find = function(query, cb) {
    var compiler = new JSCompiler();

    compiler.compile(query);

    var options = {
      map: function(key, value, emit) {
        var result = run(JSON.parse(value));
        if (result) {
          emit('value', result);
        }
      },
      reduce: function(key, values) {
        return values;
        //sort
      }
    };

    this.mapReduce(options, function(values) {
      cb(null, values);
    });
    //run({ name: 'kevin', type: 'humn', color: 'red', length: 197 });

    function run(obj) {
      var result;

      if (result = check(obj)) {
        return result;
      };
    }

    function check(obj) {
      var match = true;

      for (var i = 0; i < compiler.filter.length; i++) {
        match = compiler.filter[i](obj);
        if (!match) {
          break;
        }
      }

      if (match) {
        if (!compiler.fields.length
            || compiler.fields[0] === '*'
            || compiler.fields[0].name === '*') {
          return obj;
        }

        var result = {};
        compiler.fields.forEach(function(field) {
          var name = field.alias || field.name;
          result[name] = obj[field.name];
        });

        return result;
      }
    }
  };
};


