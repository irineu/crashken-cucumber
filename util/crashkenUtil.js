const request = require('request');
const config = require('../config');

doPost = (path, body) => {
	return new Promise((resolve, reject) => {
		request.post({
			url: `${config.crashkenURL}/${path}`,
			form: body
		}, function(err,httpResponse,body) {
			if(err){
				reject(err);
			}else{
				resolve(body);
			}
		});
	});
}

module.exports = {
	sessionID: undefined,
	waitList: {
		alloc: (deviceId, apiKey) => {
			return doPost('/services/device/ticket/alloc', {deviceId, apiKey});
		},
		check: (token) => {
			return doPost('/services/device/ticket/check', {token});
		}
	},
	report: {
		start: (name, level) => {
			return doPost(`api/mobile/report/${module.exports.sessionID}/start`, {
				name: name,
				level: level ? 0 : level,
			});
		},
		end: () => {
			return doPost(`api/mobile/report/${module.exports.sessionID}/end`, {});
		},
		quit: (succeed, errorCause) => {
			return doPost(`api/mobile/report/${module.exports.sessionID}/quit`, {
				succeed: succeed,
				cause: errorCause
			});
		},
	},
	sleep: (duration) => {
		return new Promise((resolve) => {
			setTimeout(resolve, duration);
		});
	}
}
