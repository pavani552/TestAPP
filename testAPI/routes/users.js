var express = require('express');
var request=require('request');
var paginate = require('express-paginate');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getDetails',function(req,res){
  console.log(req.query.search);
  var api='http://swapi.co/api/'+req.query.search;
  console.log(api);
   request(api, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    res.send(body)  
  }
})
});

router.get('/pagination',function(req,res){
 page({}, { page: 'http://swapi.co/api/', limit: 10 }, function(err, users, pageCount, itemCount) {
  console.log(users);
    if (err) return next(err);
	res.send("dsafds")
    res.format({
      html: function() {
        res.render('users', {
          users: users,
          pageCount: pageCount,
          itemCount: itemCount,
          pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
      },
      json: function() {
        // inspired by Stripe's API response for list objects
        res.json({
          object: 'list',
          has_more: paginate.hasNextPages(req)(pageCount),
          data: users
        });
      }
    });

  });

});
module.exports = router;
