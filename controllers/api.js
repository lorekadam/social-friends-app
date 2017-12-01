const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'), { multiArgs: true });
const graph = require('fbgraph');
const lob = require('lob')(process.env.LOB_KEY);

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'facebook');
  graph.setAccessToken(token.accessToken);
  graph.get(
    `${
      req.user.facebook
    }?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`,
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render('api/facebook', {
        title: 'Facebook API',
        profile: results
      });
    }
  );
};

/**
 * GET /api/lob
 * Lob API example.
 */
exports.getLob = (req, res, next) => {
  lob.routes.list({ zip_codes: ['10007'] }, (err, routes) => {
    if (err) {
      return next(err);
    }
    res.render('api/lob', {
      title: 'Lob API',
      routes: routes.data[0].routes
    });
  });
};

/**
 * GET /api/upload
 * File Upload API example.
 */

exports.getFileUpload = (req, res) => {
  res.render('api/upload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = (req, res) => {
  req.flash('success', { msg: 'File was uploaded successfully.' });
  res.redirect('/api/upload');
};

exports.getGoogleMaps = (req, res) => {
  res.render('api/google-maps', {
    title: 'Google Maps API'
  });
};
