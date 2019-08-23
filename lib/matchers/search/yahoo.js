var querystring = require('querystring');
var parse = require('tldts').parse;

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('search.yahoo') === -1) {
    return callback(null, false);
  }
  
  var tld = parse(referrer.href);
  if (!tld || !tld.publicSuffix || !tld.domain) {
    return callback(null, false);
  }

  if (tld.domain.indexOf('yahoo.') === 0 && tld.subdomain.indexOf('search') !== -1) {
    var description = { type: 'search', engine: 'yahoo' };
    var query = querystring.parse(referrer.query).p;
    if (query) description.query = query;
    return callback(null, description);
  }

  return callback(null, false);
};