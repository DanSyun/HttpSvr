var http = require('http');
var url = require('url');
var handler = require('./http_handler.js')

var listen_host = "0.0.0.0";
var listen_port = 80;

// HTTP 响应
function httpResponse(response, status, data)
{
	var http_body = { "status": status, "data": data };
	response.writeHead(200, {"content-Type":"text/html"});
	response.write(JSON.stringify(http_body) + "\r\n");
	response.end();
}

function onHttpRequest(request, response)
{
	// HTTP method
	var method = request.method;
	var url_parsed = url.parse(request.url);
	var path = url_parsed.pathname;
	var http_body = "";

	// HTTP 消息体
	request.on("data", function(data)
	{
		http_body += data;
	});
	// 接收完成
	request.on("end", function()
	{
		var para = "";
		// GET 请求参数在请求行中
		if (method == "GET")
		{
			para = url_parsed.query ? url_parsed.query : "";
		}
		// POST 请求参数在请求体中
		else if (method == "POST")
		{
			para = http_body
		}
		else
		{
			httpResponse(response, -2, "invalid method or para.");
		}

		// 目前只支持GET 和POST 请求
		console.log("******** recieve a new request ********")
		console.log("request method: " + method);
		console.log("request path: " + path);
		console.log("request para: " + para);
		para = require('querystring').parse(para);
		console.log("request para parsed: " + JSON.stringify(para));
		handler.handleMessage(request, response, path, para)
	});
	// 错误处理
	request.on("error", function(error)
	{
		httpResponse(response, -1, error);
	});
}

http.createServer(onHttpRequest).listen(listen_port, listen_host);
