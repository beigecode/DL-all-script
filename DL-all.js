/* Unfortunately they were like “oh, by the way you can only download one at a time by clicking the link”.
 So I was like, “fuck you” and did the following:
I opened up firebug and noticed they used jQuery on their page, so i ran the following and got an array of the URLs for each file:
 */


var urls = [];
 
$('div.body ol li a').each(function() {
     urls.push($(this).attr('href'));
});
 
console.log(JSON.stringify(urls));

/* 

Now that I had the file URLs in an easy to use array,
I wrote a small node script to download each file into a folder for me asynchronously:

 */

 var fs = require('fs'),
      http = require('http'),
      url = require('url'),
      path = require('path');

urls.forEach(function(u, i) {
    http.get(u, function(res) {
        var fname = path.join('musika', path.basename(url.parse(u).path)),
            ws = fs.createWriteStream(fname);

        res.pipe(ws);

        res.on('end', function() {
            console.log('Download complete (' + i + '/' + urls.length + '): ' + fname);
        });
    });
});