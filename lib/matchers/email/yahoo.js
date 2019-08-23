var parse = require('tldts').parse;

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('mail.yahoo') === -1) {
    return callback(null, false);
  }

  var tld = parse(referrer.href);
  if (!tld.publicSuffix || !tld.domain) {
    return callback(null, false);
  }

  if (tld.domain.indexOf('yahoo.') === 0 && tld.subdomain.indexOf('mail') !== -1) {
    return callback(null, {
      type: 'email',
      client: 'yahoo',
      from: referrer.href,
      link: href.href
    });
  } else {
    return callback(null, false);
  }

};