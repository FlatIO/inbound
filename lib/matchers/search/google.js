
var querystring = require('querystring');

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.match(/^(www.)?google\.[a-z\.]+/) != null) {
    var description = { type: 'search', engine: 'google' };
    var query = querystring.parse(referrer.query).q;
    if (query) description.query = query;
    return callback(null, description);
  } else {
    return callback(null, false);
  }
};
