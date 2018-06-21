
// shell ipset 操作接口，异步，接口参数和shell 保持一致

var shell = require("shelljs");

// 是否安装ipset
function haveIpset()
{
	return shell.which('ipset');
}

function ipsetCreate(set_name, type_name, create_options, callback)
{
	if (!haveIpset()) return callback(false);
	if (!set_name || !type_name) return callback(false);

	var cmd = "ipset create " + set_name + " " + type_name;
	if (create_options)
	{
		cmd += " " + create_options;
	}
	console.log(cmd);
	shell.exec(cmd, (code, stdout, stderr) => {
		if (code == 0)
		{
			// ipsetList();
			console.log("succ");
			return callback(true);
		}
		else
		{
			console.log("err");
			return callback(false);
		}
	});
}

function ipsetAdd(set_name, add_entry, add_options, callback)
{
	if (!haveIpset()) return callback(false);
	if (!set_name || !add_entry) return callback(false);

	var cmd = "ipset add " + set_name + " " + add_entry;
	if (add_entry)
	{
		cmd += " " + add_options;
	}
	console.log(cmd);
	shell.exec(cmd, (code, stdout, stderr) => {
		if (code == 0)
		{
			console.log("succ");
			return callback(true);
		}
		else
		{
			console.log("err");
			return callback(false);
		}
	});
}

function ipsetDel(set_name, del_entry, del_options, callback)
{
	if (!haveIpset()) return callback(false);
	if (!set_name || !del_entry) return callback(false);

	var cmd = "ipset del " + set_name + " " + del_entry;
	if (del_options)
	{
		cmd += " " + del_options;
	}
	console.log(cmd);
	shell.exec(cmd, (code, stdout, stderr) => {
		if (code == 0)
		{
			return callback(true);
		}
		else
		{
			return callback(false);
		}
	});
}

function ipsetTest(set_name, test_entry, test_options, callback)
{
	if (!haveIpset()) return callback(false);
	if (!set_name || !test_entry) return callback(false);

	var cmd = "ipset test " + set_name + " " + test_entry;
	if (test_options)
	{
		cmd += " " + test_options;
	}
	console.log(cmd);
	shell.exec(cmd, (code, stdout, stderr) => {
		if (code == 0)
		{
			return callback(true);
		}
		else
		{
			return callback(false);
		}
	});
}

function ipsetList(set_name, options)
{
	if (!haveIpset()) return callback(false);

	var cmd = "ipset list";
	if (set_name)
	{
		cmd += " " + set_name;
	}
	if (options)
	{
		cmd += " " + options;
	}
	console.log(cmd);
	shell.exec(cmd, (code, stdout, stderr) => {
		if (code == 0)
		{
			return callback(true);
		}
		else
		{
			return callback(false);
		}
	});
}

function ipsetFlush(set_name)
{
	if (!haveIpset()) return callback(false);

	var cmd = "ipset flush";
	if (set_name)
	{
		cmd += " " + set_name;
	}
	console.log(cmd);
	shell.exec(cmd, (code, stdout, stderr) => {
		if (code == 0)
		{
			return callback(true);
		}
		else
		{
			return callback(false);
		}
	});
}

exports.ipsetCreate = ipsetCreate;
exports.ipsetAdd	= ipsetAdd;
exports.ipsetDel	= ipsetDel;
exports.ipsetTest	= ipsetTest;
exports.ipsetList	= ipsetList;
exports.ipsetFlush	= ipsetFlush;

// ipsetCreate("hihi", "hash:ip", "comment");