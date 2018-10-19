const {BeforeAll, Before, After, AfterAll, setWorldConstructor, setDefaultTimeout} = require('cucumber');
const wd = require('wd');
const crashkenUtil = require('../../util/crashkenUtil');
const config = require('../../config');


Before(function(scenario) {
	let world = this;
	world.driver = wd.remote(`${config.crashkenURL}/api/mobile/wd/hub`, 'promiseChain');

	let deviceId = "<Device ID>";
	let apiKey = "<API key>";

	return new Promise((resolve, reject) => {

		crashkenUtil.waitList.alloc(deviceId, apiKey).then( async (allocResp) => {
			allocResp = JSON.parse(allocResp);
			position = allocResp.position;
			token = allocResp.token;

			while(position !== 0) {
				await crashkenUtil.sleep(5000);
				let checkResp = await crashkenUtil.waitList.check(allocResp.token);
				checkResp = JSON.parse(checkResp);

				if(checkResp.message === 'Token Unrecognized'){
					return reject(checkResp.message);
				}else{
					position = checkResp.position;
				}
			}

			await crashkenUtil.sleep(10000);

			world.driver.init({
				apiKey: apiKey,
				deviceId: deviceId,
				executionName: scenario.pickle.name,
				token: token,

				appPackage: 'banco.devicelab.com.br.banco',
				appActivity: '.MainActivity',
			})
			.then((params) => crashkenUtil.sessionID = params[0])
			.then(resolve)
			.catch(reject);
		});
	})
});

After(function(scenario) {

	let cause = undefined;
	let passed = scenario.result.status === 'passed';
	if(!passed){
		cause = scenario.result.exception.message
	}

	return this.driver.resolve(crashkenUtil.report.quit(passed, cause))
	.quit();
})

setDefaultTimeout(60 * 1000 * 2);
