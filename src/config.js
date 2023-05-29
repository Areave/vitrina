// const sid = (new URL(document.location)).searchParams.get("token_key");
// console.log(sid)

var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

const protocol = getParams(document.location.href)?.protocol
const api_host = getParams(document.location.href)?.api_host
const api_pref = getParams(document.location.href)?.api_pref
const sid = getParams(document.location.href)?.token_key
// console.log(sid)

const _default = global.config = {
	protocol: protocol || 'https',
	apiHost: api_host || 'api.100czk.cz',
	apiPrefix: api_pref ?? 'api_v2',
	sid: sid,
	// protocol: 'http',
	// apiHost: 'localhost:4200',
	// apiPrefix: '',
	// sid,
	// sid: 'b52490d7c0c4938a3cc524c730057a59',
	currency: 'Kč'
};
export { _default as default };