var JSCompiler = require('./compiler');

var ql = 'where (color="red" and length < 199) or length > 500 or type like "%man"';

var compiler = new JSCompiler();

compiler.compile(ql);

run({ name: 'kevin', type: 'humn', color: 'red', length: 197 });

function run(obj) {
  var result;

  if (result = check(obj)) {
    emit(result);
  };
}

function emit(obj) {
  console.log(obj);
};

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

