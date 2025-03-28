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
	apiPrefix: api_pref ?? 'api_v2',
	sid: sid,
	// protocol: 'http',
	// apiHost: 'localhost:4200',
	// apiPrefix: '',
	// sid,
	// sid: 'b52490d7c0c4938a3cc524c730057a59',
	currency: 'Kč'
};

// let start = () => {
	if(!sid) {
		getToken().then((data) => {
			console.log("t", data.data.data.key);
			// global.config.sid='383f6145daa9297a2275603d6819887e';
			global.config.sid = data.data.data.key;
		}).catch((error) => {

		});
	}
// }

// start();

export { _default as default };