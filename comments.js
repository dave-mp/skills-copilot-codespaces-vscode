// Create a web server

const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// Load the comments from the file
let comments = JSON.parse(fs.readFileSync('comments.json'));

// Create a web server
http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url);
  // Parse the query string
  const parsedQuery = querystring.parse(parsedUrl.query);
  // Set the content type
  res.setHeader('Content-Type', 'application/json');
  // Handle the request
  switch (parsedUrl.pathname) {
    case '/comments':
      if (req.method === 'GET') {
        res.end(JSON.stringify(comments));
      } else if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const comment = JSON.parse(body);
          comments.push(comment);
          fs.writeFileSync('comments.json', JSON.stringify(comments));
          res.end(JSON.stringify(comments));
        });
      }
      break;
    default:
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Not Found' }));
      break;
  }
}).listen(3000);