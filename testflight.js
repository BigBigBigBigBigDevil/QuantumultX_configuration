
const CONFIG = {
  apps: [
    {
      name: "微博",
	 // url:"https://testflight.apple.com/join/VCIvwk2g"
      url: "https://testflight.apple.com/join/9GTuC9Ri"
    }
  ],
  // 首次发现空位是否通知
  notifyFirst: true
};

function checkApp(app) {
  return $task.fetch({
    url: app.url,
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1",
      "Cache-Control": "no-cache"
    }
  }).then(res => {
	if (res.statusCode === 200) {
		const divReg = /<div\s+class=["']beta-status["']>(?:[\s\S]*?<\/div>){2}/i;
		const match = res.body.match(divReg);
		if (match[0].includes("TestFlight") == true ) {
			$notify("TestFlight空位监控", "","完整链接："+app.url,{"open-url":app.url});
		}
	}
	$done();
  }).catch(err => {
	$done();
  });
}

Promise.all(CONFIG.apps.map(checkApp))
  .then(() => $done())
  .catch(() => $done());
