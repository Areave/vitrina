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




const _default = global.config = {
	protocol: protocol || 'https',
	apiHost: api_host || 'api.dev.100czk.cz',
	apiPrefix: api_pref ?? 'api_v3',
	sid: 'd656de5802fd14c8b2b6cef6c258c2ebWbf5mEZfkEnMraxjOmciaraGEoSDkmFlqVEIWEyLcaPHgZwW9PyEP1XqP0DMH5nsqajLqjEj8OZYcNBn2BIR42BTmXF7T5MDNAqamCyojpbjtqs1DAvYySu8lILMGfyGhwfTyk2iChtanUvDfo8vfK3v4kgjHuiBEn6q1EuCLsNVa6OFag2wNU2sx1Nf2e3FFCWbwpcvgljBfWNi7oLOTr4eoevoQF4VK2vn5FfwI4319dOP21qdwNTutXbeEADxv8SAyQDnIP3wbQuMsjJIks9TMYQZiYksYzNyaqh1sQpuNOMWuqRoElv5jyyuCibhANQShTSAudLj23X5O66QGT7yK7Ifvb5251iQS4iIpn3dFfICwIX1kfcDHM4Cp8yEFCxUHMlsN2XDtCbc9L8NdYfcZa5LTXa9uW7bjRTIWOR3kJ1Y5poUEVsVW6FmxcuKdTU0u6neEHyg9lYYHkF3D7p9NYUmD1uWoBJceIvARI1RGtiVaTY2qSDtOpMypE2aP0coPhC4sulIZEDjLxrc',
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
}

export { _default as default };