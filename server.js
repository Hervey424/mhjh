const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const query = querystring.parse(parsedUrl.query);
  const version = query.version; 
  const pathname = parsedUrl.pathname;

  if (pathname === '/gameclient.js') {
    res.setHeader('Access-Control-Allow-Origin', '*');  // 允许所有来源
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // 允许的方法
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // 允许的请求头
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    https.get('https://cqsj-cdn1.7ronggame.com/cqsj/client/ly/js/gameClient_'+ version +'.js?r=' + Math.random(), (aRes) => {
      let aData = '';
      aRes.on('data', chunk => {
        aData += chunk;
      });
      aRes.on('end', () => {
        https.get('https://raw.githubusercontent.com/Hervey424/mhjh/refs/heads/master/SamiraFight.js?r='+ Math.random(), (bRes) => {
          let bData = '';
          bRes.on('data', chunk => {
            bData += chunk;
          });
          bRes.on('end', () => {
            const modifiedText = aData.replace(/\/\/class com.game.core.scene.view.image.MapImageBitmap extends com.game.core.avatar.CImage/gi, bData);
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(modifiedText);
          });
        }).on('error', (err) => {
          console.error('Error fetching from b.com:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error fetching from b.com');
        });
      });
    }).on('error', (err) => {
      console.error('Error fetching from a.com:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error fetching from a.com');
    });
  }
  else if (pathname === '/Code.max.js') {
    res.setHeader('Access-Control-Allow-Origin', '*');  // 允许所有来源
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // 允许的方法
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // 允许的请求头
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    https.get('https://cqsj-cdn3.7ronggame.com/cqsj/client/ly/Code.max_'+ version +'.js?r=' + Math.random(), (aRes) => {
      let aData = '';
      aRes.on('data', chunk => {
        aData += chunk;
      });
      aRes.on('end', () => {
        const modifiedText = aData.replace(/!Laya.stage.isVisibility/gi, 'false');
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(modifiedText);
      });
    }).on('error', (err) => {
      console.error('Error fetching from a.com:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error fetching from a.com');
    });
  }
  else if (pathname === '/css.css') {
    https.get('https://raw.githubusercontent.com/Hervey424/mhjh/refs/heads/master/css.css?r='+ Math.random(), (bRes) => {
      let bData = '';
      bRes.on('data', chunk => {
        bData += chunk;
      });
      bRes.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(bData);
      });
    }).on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error fetching from css.css');
    });
  }
  else {
    // 处理其他请求
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found' + version);
  }
}).listen(3000, '0.0.0.0', () => {
  console.log('Server is running on http://localhost:3000');
});