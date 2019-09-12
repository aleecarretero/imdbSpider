var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');

request('https://www.imdb.com/chart/top', function(err, res, body){
    if (err) console.log('Erro: ' + err);

    var $ = cheerio.load(body);

    $('.lister-list tr').each(function(done) {

        var title = $(this).find('.titleColumn a').text().trim();
        var rating = $(this).find('.imdbRating strong').text().trim();
        var year = $(this).find('.titleColumn span').text().trim().match(/\d{4}/g);

        fs.appendFile('imdb.txt', title + ' - (' + year + ') - ' + rating + '\n', function(err, res){
        	if(err) console.log('Erro: ', err);
        });
    });
});
