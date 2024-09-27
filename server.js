const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

const css = `.samira-settings{
  width: 1000px; 
  position: fixed; 
  top: 15%; 
  left: 50%; 
  margin-left: -600px; 
  background: #000000; 
  border-radius: 5px; 
  color: #fff;
}

.samira-settings input[type=input]{
  outline: none;
}

.samira-settings-inner{
  height: 100%; 
  display: flex; 
  flex-direction: column;
}

.samira-settings-header{
  border-bottom: 1px solid #ddd; 
  text-align: center; 
  line-height: 50px; 
  font-size: 18px; 
  font-weight: bold;
}

.samira-settings-content{
  flex: 1; 
  overflow: hidden;
}

.samira-settings-footer{
  display: flex; 
  border-top: 1px solid #ddd; 
  padding: 10px 0px; 
  justify-content: center;
}

.samira-settings-footer-btn{
  color: #fff; 
  border-radius: 3px; 
  border: 1px solid #fff; 
  padding: 3px 10px; 
  margin-right: 10px;
  cursor: pointer;
}

.samira-settings-fieldset{
  margin: 10px;
}

.samira-settings-items{
  overflow: hidden;
}

.samira-settings-items-group{
  overflow: hidden;
}

.samira-settings-item{
  float: left;
  margin-right: 15px;
  margin-top: 3px;
  margin-bottom: 3px;
}

.samira-status-contaienr{
  background: #00000099; 
  position: fixed; 
  bottom: 2px; 
  left: 0; 
  color: #fff;
}

.samira-hp-container{
  display: none;
  position: fixed;
  left: 0;
  bottom: 40px;
  overflow: hidden;
  background: #00000099;
  border-radius: 3px;
  color: #fff;
}

.samira-settings-maps{
  display: flex;
}

.samira-settings-map-cat{
  height: 300px;
  flex: 1;
  border: 1px solid #fff;
  overflow: hidden;
}

.samira-settings-map-cat-title{
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #fff;
  text-align: center;
}`

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

    https.get('https://cqsj-cdn1.7ronggame.com/cqsj/client/ly/js/gameClient_'+ version +'.js', (aRes) => {
      let aData = '';
      aRes.on('data', chunk => {
        aData += chunk;
      });
      aRes.on('end', () => {
        https.get('https://raw.githubusercontent.com/Hervey424/mhjh/refs/heads/master/SamiraFight.js', (bRes) => {
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
  else if (pathname === '/css.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(css);
  }
  else {
    // 处理其他请求
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found' + version);
  }
}).listen(3000, '0.0.0.0', () => {
  console.log('Server is running on http://localhost:3000');
});