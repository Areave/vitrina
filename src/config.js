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
	sid: 'c5a8667af8e5fdbfa52a4882c71434e93zJuClG1VwD86lMRRClrgwRNZbnRr81wRTHL1NQCX2pH5QAEFSuOtbHqUok82r8Tu4SsGkVQ2YxHYUsNLXk2zwlRxr2vt2qtVRJjwEOJpW7LleEVKoF4Q75jxDcINcSi2piXNwA0X4P0cPyMj7LFWwHuqb85gpgCLo6giGIpA8OHcNnlKLu7MftyBZ4FqahPvrhjni9Bh9Y8WGC1eJskvJvNZUABBxMwGUHXN8Dx1JtZAse1fHBG8Q8VFHxsv9BgKLrSP3sPa3HDq54kwfup4cemfZPlG9Z7vl56yQrQbxqM8TJadZQS9KwaljhKG3bfFHNKHh1D101U1CyqBTPESNEbIBEU62Bj4dsuvwybp4mTbXTGnd3OxtrAlWgqcxldImIAfbCSMtVx8P7ielEp0wa4bBFPhnREGI6FMCivjPxgRrfkoQaNYQYClh5MDPYWBo5n6ZKnPCvoxNpTrXtasqClcVjNmJfxKv8sxEVVwd5GvBEFOo4KsGwMITur4pAda3CJh9pTe6G6HMCh4Bai',
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