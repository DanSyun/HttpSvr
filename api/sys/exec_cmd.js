
// 执行shell 命令

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
	var exec = require("child_process").exec;
	var ret = exec(para.cmd, function(error, stdout, stderr)
	{
		console.log("**************callback***************");
		if (!error)
		{
			console.log(stdout);
			console.log(stderr);
			httpResponse(response, 0);
		}
		else
		{
			console.log("error: " + error);
			httpResponse(response, 1);
		}
	});
	ret.stdout.on('data', (data) => {
		console.log("**************out***************");
		console.log(data);
	});

	ret.stderr.on('data', (data) => {
		console.log("**************err***************");
		console.log(data);
	});

	ret.on('close', (code) => {
		console.log("exit code: " + code);
	});
}

exports.onMessage = onMessage;