//Bharath Gunasekaran
'use strict';

const _ = require('lodash');
const rp = require('request-promise');

const verbs = ['get', 'head', 'post', 'put', 'patch', 'delete'];

/**
 * Wrapper around request-promise.
 *
 * @exports request
 * @returns {Promise<any>}
 */
async function request(uri, opts) {
  let params = rp.initParams(uri, opts);
  return await rp(params);
}

request.jar = rp.jar;
request.cookie = rp.cookie;

verbs.forEach(function (verb) {
  request[verb] = function (uri, options) {
    const params = rp.initParams(uri, options);
    params.method = verb.toUpperCase();
    return request(params);
  };
});

/*
 * Wrapper around request-promise.defaults function.
 * Consolidates all default settings.
 *
 */
request.defaults = function (options) {
  options = _.merge({}, this.options, options);

  const wrapped = function (uri, opts) {
    const params = rp.initParams(uri, opts);
    const merged = _.merge({}, options, params);
    return request(merged);
  };

  // inherit all properties and merge in the new defaults
  Object.assign(wrapped, request);

  verbs.forEach(verb => {
    wrapped[verb] = function (uri, opts) {
      const params = rp.initParams(uri, opts);
      const merged = _.merge({}, options, params, {
        method: verb.toUpperCase(),
      });
      return request[verb](merged);
    };
  });

  wrapped.options = options;
  return wrapped;
};

export default request;
// Bharath Gunasekaran