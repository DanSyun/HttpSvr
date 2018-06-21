// curl "http://127.0.0.1/api/sys/ipset_create" --data-urlencode "set_name=test_set123" --data-urlencode "type_name=hash:ip" --data-urlencode "options=timeout 100"

var ipset = require("../../util/ipset.js");

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
	if (!para.set_name || !para.type_name)
	{
		return httpResponse(response, 100);
	}
	ipset.ipsetCreate(para.set_name, para.type_name, para.options, (ret) => {
		if (ret)
		{
			httpResponse(response, 0);
		}
		else
		{
			httpResponse(response, 101);
		}
	})
}

exports.onMessage = onMessage;