
// HTTP 响应
function httpResponse(response, status, data)
{
	var http_body = { "status": status, "data": data };
	response.writeHead(200, {"content-Type":"text/html"});
	response.write(JSON.stringify(http_body) + "\r\n");
	response.end();
}

// api 入口函数
function onMessage(request, response, para)
{
	console.log("this is api demo");
	httpResponse(response, 0, "api demo.");
}

exports.onMessage = onMessage;