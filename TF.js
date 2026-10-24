let tf_ids = $prefs.valueForKey("tf_ids");
let tf_notify_success = $prefs.valueForKey("tf_notify_success");
let ids = tf_ids.split(",");
let newids = ids.map(item => ({notify:tf_notify_success,name:"",url:"https://testflight.apple.com/join/"+item}));
if (newids.length > 0) {
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
		const titleRegex = /(?<=<title[^>]*>)[\s\S]*?(?=<\/title>)/i;
		const match = res.body.match(divReg);
		if (match[0].includes("TestFlight") == true ) {
			if (app.notify) {
				$notify("TestFlight空位监控", res.body.match(titleRegex),"完整链接："+app.url,{"open-url":app.url});
			}
		}
	}
	$done();
  }).catch(err => {
	$done();
  });
}

Promise.all(newids.map(checkApp))
  .then(() => $done())
  .catch(() => $done());
}
