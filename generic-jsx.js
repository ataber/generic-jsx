var FromSymbol = Symbol("from");
var ArgumentsSymbol = Symbol("arguments");

function curry(resolver) {
  return function(aFunctionName, boundArguments) {
    var aFunction = (typeof aFunctionName === "string") ?
    resolver(aFunctionName) :
    aFunctionName;

    let [name, props, ...children] = arguments;
    let builtChildren = children.map((n) => {
      if (typeof n === "function") {
        return new n();
      } else {
        return n;
      }
    })
    let transformedArguments = {...boundArguments, children: builtChildren};

    return function(args)
    {
      if (args && args[ArgumentsSymbol])
        return call(aFunction, map({...transformedArguments, ...args}));

      return call(aFunction, map({[ArgumentsSymbol]: true, ...transformedArguments, ...arguments}));
    }

    function map(args)
    {
      if (!Object.keys(args).some(key => args[key][FromSymbol] !== undefined))
        return args;

      var adjusted = { [ArgumentsSymbol]: true };

      for (var key of Object.keys(args))
        adjusted[key] = exhaust(key, args);

      return adjusted;
    }

    function exhaust(key, args)
    {
      var value = args[key];

      if (value && value[FromSymbol] !== undefined)
        return exhaust(value[FromSymbol], args);

      return args[key];
    }
  }
}

function from(aKey) {
  return { [FromSymbol]: aKey };
}

function call(aFunction, properties) {
  if ("constructor" in aFunction) {
    return new aFunction(properties);
  } else {
    return aFunction(properties);
  }
}

module.exports.from = from;
module.exports.curry = curry;
