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
const sid = getParams(document.location.href)?.token_key
console.log(sid)

module.exports = global.config = {
    protocol: 'https',
    apiHost: 'api.100czk.cz',
    apiPrefix: 'api_v2',
    // protocol: 'http',
    // apiHost: 'localhost:4200',
    // apiPrefix: '',
    sid,
    // sid: '3fb81133e0554d58143321f288c4b5a2',
    currency: 'Kč'
}