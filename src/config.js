// const sid = (new URL(document.location)).searchParams.get("token_key");
// console.log(sid)

import axios from "axios";
import awaitAsyncGenerator from "@babel/runtime/helpers/esm/awaitAsyncGenerator";

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
let sid = getParams(document.location.href)?.token_key;
// let sid = '5ad6b8597f9c716698a0a0eb34e0487c';
// console.log(sid)

const getToken = async () => {
	const url = `${_default.protocol}://api.dev.100czk.cz/api_v3/get_test_kiosk_token`;
	return await axios.get(url);
};

export const getCurrentToken = () => {
	const token = getParams(document.location.href)?.token_key;
	global.config.sid = token;
	return token
};

const _default = global.config = {
	protocol: protocol || 'https',
	apiHost: api_host || 'api.dev.100czk.cz',
	apiPrefix: api_pref ?? 'api_v3',
	sid: sid,
	// protocol: 'http',
	// apiHost: 'localhost:4200',
	// apiPrefix: '',
	// sid,
	// sid: 'b52490d7c0c4938a3cc524c730057a59',
	currency: 'Kč'
};

if(!sid) {
	const t = getToken();
	console.log("t", t);
	global.config.sid='c7a6e0250cab21954634734a6e998d9b2JkCqHEwJVjgG1ZkWYmRpe8StyDKkNuc8ry6gJ3aYuNiyrpVAEsZ0blXmoeB4Fjb84e0UP4bqZBbfgYYusYoOaHBpDi8fo4fM7Sk3eCXK3wyiK52x2I8JfcQFhS43y4Jy6LwuJO8a3wD6Y3aLtc9k7n68fkMq2323Vg41u1bXXO4vIJAwAptSFQB7Dkzt36V8KCl5ASMRPMUNZrPLeXhNT1BQwf8icuY1OcaVxfnaUG6XmCSwKNtTVOakKccMqLioEGlrE6s6MYoqvdJoGgnldhOeyltuh9fEAKY2hJbONyBJtGYoqQYsYWthZUlJfbCAtwZmdGBlNEhInjhV2n8etaG9cqfbgI9WQJj6fBFfn24JYakJnLDNPfaNpBilVXoPI7AyDtm4PXO5CbbVeiMAuxiqSrLsDCJRKHeqC92WNT8ncZZOQmqktkMsBHdqCCQUfCDZW1yJyD8b79bGrXyXpXEsvwKXNBQVDszwZQ5KooTD86qhqM086MKKFkQGj2MqPrW4RwRwR1Ju0ZnZCvP'
}

export { _default as default };