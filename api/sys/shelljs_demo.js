
// https://www.npmjs.com/package/shelljs

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
	var shell = require("shelljs");
	// 默认是同步执行，显式参数或加入回调才是异步
	var child_process = shell.exec(para.cmd, /*{async: true, silent: true},*/ function(code, stdout, stderr)
	{
		console.log("**************callback***************");
		if (code == 0)
		{
			console.log(stdout);
			console.log(stderr);
			httpResponse(response, 0);
		}
		else
		{
			console.log("error code: " + code);
			httpResponse(response, 1);
		}
	});
	// child_process.stdout.on('data', function(data)
	// {
	// 	console.log("**************out***************");
	// 	console.log(data);
	// });
	// child_process.stderr.on('data', function(data)
	// {
	// 	console.log("**************err***************");
	// 	console.log(data);
	// });
	// child_process.on('close', function(code)
	// {
	// 	console.log("exit code: " + code);
	// });
}

exports.onMessage = onMessage;