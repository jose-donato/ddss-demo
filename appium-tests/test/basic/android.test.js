const webdriverio = require('webdriverio');
const androidOptions = require('../../options').androidOptions;
const assert = require('chai').assert;

describe('Testing ddss-demo', function () {
    let client;

    before(async function () {
        androidOptions.capabilities.app = "https://f003.backblazeb2.com/file/misc-01231/snack-ddss-demo-final.apk"
        client = await webdriverio.remote(androidOptions);
        //com.josedonato.ddssfinaldemo/host.exp.exponent.MainActivity
    });

    it('packageName and mainActivity', async function () {
        const currentPackage = await client.getCurrentPackage();
        assert.equal(currentPackage, 'com.josedonato.ddssfinaldemo');
        const currentMainActivity = await client.getCurrentActivity()
        assert.equal(currentMainActivity, 'host.exp.exponent.MainActivity')
    });

    it('correct credentials redirect to homepage', async function () {
        const signin_usernameInput = await client.$("~signin_usernameInput")
        await signin_usernameInput.setValue(procces.env.USERNAME)
        const signin_passwordInput = await client.$("~signin_passwordInput")
        await signin_passwordInput.setValue(proccess.env.PASSWORD)
        const signin_button = await client.$("~signin_submitButton")
        await signin_button.click()
        const homepage_shodanQueryInput = await client.$("~home_shodanQueryInput")
        await homepage_shodanQueryInput.waitForDisplayed(3000)
        const home_shodanQueryInputText = await homepage_shodanQueryInput.getText();
        assert.equal(home_shodanQueryInputText, "Shodan query...");
    });
    
    /*it('should create and destroy a session', async function () {
        const res = await client.status();
        assert.isObject(res.build);

        const delete_session = await client.deleteSession();
        assert.isNull(delete_session);
    });*/
});
