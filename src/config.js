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

// if(!sid) {
// 	// const t = getToken();
// 	// console.log("t", t);
// 	global.config.sid='fbb4f0a45aff34df8642f6bf4f36f7319WJEWG3bEJb5yZaq4Jb3PBqwLBcJHvuWi5Oqp3rMQAPQXCxdNEAYKIQAfUqvorA2eCy1uOdprBgCsXyT5bAXDHT4uLommotsFNMWh85NuBqkJl4LKfnOcCsGhrWRmkTVjrAKraWA0I6wkZkNGtgOqEYGQRlaSQeR4SMpxHgfpyhfBv2QFBArOteu6yOb4RsTrcyFHCNszGC6cBeCfiVLNKnxpXW1I1qF2uARwcViHOr2j2x5XI0gQt7EAmaLbrk9WV6lqQ2QMfNs8wogSyoGa69d5mYqdiqtlu8KWuGA9pkhxWs8iFZydlfx1bkXG2hGJ4rL2C2ObYGuc4yhUizUPQPdOG2AlJoOvITqu2Fb8Sk5SGyhC91Bb4VxAZQQXXpVDvmbxHMpOI5Ma7fPB54NW17TyCGEtMB3VjqB5jCTscgxvp58GisFKKYsIYe7bGHCDn7NwfbrmeQLA6tiiXO3F6f1yFViIXErdS7qyeZHYbdRvDLtG671EQlHDzuTfKy94ZottCBVuADW2fy6KRgW'
// }

export { _default as default };