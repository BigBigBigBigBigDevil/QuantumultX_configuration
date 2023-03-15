/*******************************

脚本名称: Silimini——解锁VIP
https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/Silimini.js

*******************************

[rewrite_local]

^http[s]?:\/\/silimini.bigwinepot.com url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/Silimini.js

[mitm] 

hostname = silimini.bigwinepot.com

*******************************/

var body = $response.body.replace(/"member":0/g,'"member":1')
$done({ body });
