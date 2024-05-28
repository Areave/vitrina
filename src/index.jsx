import "../public/css/global.css";
import "../public/css/signpost.css";
import "../public/css/font-awesome.css";
import '../public/script/jquery-3.2.1.min.js'
import '../public/script/jquery-ui.min.js'
import '../public/css/jquery-ui.min.css'
import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";
import { Provider } from "react-redux";
import { store } from "./reducers";
import "./config";
import "../public/script/main.js";
// import axios from 'axios'
// import '../public/script/screensaver.js'

// console.log("store", store.getState());



// store.setState({
//     // storage: store?.storage || window.localStorage.getItem("storage"),
//     catalog: store?.catalog || window.localStorage.getItem("catalog"),
//     // collaborators: store?.collaborators || window.localStorage.getItem("collaborators"),
//     // storcarteage: store?.cart || window.localStorage.getItem("cart"),
// });

window.localStorage.setItem("storage", store?.storage)
window.localStorage.setItem("catalog", store?.catalog)
window.localStorage.setItem("collaborators", store?.collaborators)
window.localStorage.setItem("cart", store?.cart)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// try {
//     render(
//         <Provider store={store}>
//             <App />
//         </Provider>,
//         document.getElementById("root")
//     );
// } catch (e) {
// 	const eString = e.toString()
// 	// console.log('E:', eString)
// 	const url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? '/' + global.config.apiPrefix : ''}/add_kiosk_web_log${global.config.sid ? '?sid=' + global.config.sid : ''}`
// 	axios({
// 		method: 'POST',
// 		url,
// 		headers: {
// 			'Access-Control-Allow-Origin': '*',
// 			'Content-Type': 'application/json'
// 		},
// 		data: { status: 'OK', level: 'ERROR', body: eString }
// 	}).then((resolve, error) => {
// 		console.log('Error send', eString)
// 		if (error) {
// 			console.log('ERROR', error)
// 		} else {
// 			console.log('SUCCESS', resolve)
// 		}
// 	})
// }
