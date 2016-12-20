@{ run } = require '--RUN-LIB--';
@{ makeDOMDriver } = require '@cycle/dom';
@{ App } = require './app';

@drivers = {
  DOM: makeDOMDriver '#app'
};

run(App, drivers)
