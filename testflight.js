
const CONFIG = {
  apps: [
    {
      name: "qx",
      url: "https://testflight.apple.com/join/VCIvwk2g"
    }
  ],
  // 首次发现空位是否通知
  notifyFirst: true
};

function checkApp(app) {
  const code = app.url.split("/").pop();
  const key = "TF_MONITOR_" + code;

  return $task.fetch({
    url: app.url,
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1",
      "Cache-Control": "no-cache"
    }
  }).then(res => {
    const html = res.body || "";

    const full =
      /This beta is full|此 Beta 版已满|此 Beta 版本已满/i.test(html);

    const available =
      /Accept Invitation|接受邀请|Start Testing|开始测试/i.test(html);

    const previous = $prefs.valueForKey(key);

    if (full) {
      $prefs.setValueForKey("full", key);
      console.log(`[${app.name}] 已满`);
    } else if (available) {
      if (
        previous === "full" ||
        (previous === null && CONFIG.notifyFirst)
      ) {
        $notify(
          "TestFlight 发现空位",
          app.name,
          "点击立即加入测试",
          { "open-url": app.url }
        );
      }

      $prefs.setValueForKey("available", key);
      console.log(`[${app.name}] 疑似有空位`);
    } else {
      console.log(`[${app.name}] 状态未知`);
    }
  }).catch(err => {
    console.log(`[${app.name}] 检测失败: ${err}`);
  });
}

Promise.all(CONFIG.apps.map(checkApp))
  .then(() => $done())
  .catch(() => $done());
