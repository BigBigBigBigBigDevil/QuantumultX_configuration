/***
wps会员
from: https://raw.githubusercontent.com/510004015/Quantumult_X/Remote/Premium/WPSOffice.js


[rewrite_local]

# > Old
^https:\/\/account\.wps\.cn\/api\/users\/\d+\/overview url script-response-body https://raw.githubusercontent.com/510004015/Quantumult_X/Remote/Premium/WPSOffice.js
# > New
^https:\/\/vas\.wps\.cn\/query\/api\/v\d\/list_purchase_info url script-response-body https://raw.githubusercontent.com/510004015/Quantumult_X/Remote/Premium/WPSOffice.js

[mitm] 

hostname = account.wps.cn, vas.wps.cn

**/
