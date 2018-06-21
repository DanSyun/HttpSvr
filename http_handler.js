
// 接口注册 api_path 对应./api_path.js
var handlers = {};
function registerHandler(api)
{
	handlers[api] = require("." + api + ".js");
}
registerHandler("/api/demo");
registerHandler("/api/sys/exec_cmd");
registerHandler("/api/sys/shelljs_demo");
registerHandler("/api/sys/ipset_create");

// HTTP 响应
function httpResponse(response, status, data)
{
	var http_body = { "status": status, "data": data };
	response.writeHead(200, {"content-Type":"text/html"});
	response.write(JSON.stringify(http_body) + "\r\n");
	response.end();
}

// HTTP 请求入口函数
function handleMessage(request, response, path, para)
{
	// 寻找api 对应的.js 并执行
	if (typeof(handlers[path]) == "object")
	{
		handlers[path].onMessage(request, response, para);
	}
	else
	{
		httpResponse(response, -3, "invalid api.");
	}
}

exports.handleMessage = handleMessage;