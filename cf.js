export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/gameclient.js') { 
      const aResponse = await fetch('https://cqsj-cdn1.7ronggame.com/cqsj/client/ly/js/gameClient_2891.js');
      const aText = await aResponse.text();

      // 获取 https://www.b.com/game.js 的内容
      // const bResponse = await fetch('https://www.b.com/game.js');
      // const bText = await bResponse.text();

      // const modifiedText = aText.replace(/abcabc/g, bText);

      return new Response(aText, {
          headers: {
              'Content-Type': 'application/javascript',
          }
      });
    }
    return new Response('请求不合法：' + url.pathname);
  },
};