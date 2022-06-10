/* eslint-disable camelcase */
module.exports = {
  test_settings : {
    chrome : {
      desiredCapabilities : {
        browserName   : 'chrome',
        chromeOptions : {
          w3c  : false,
          args : ['--ignore-certificate-errors', '--ignore-ssl-errors', '--allow-insecure-localhost']
        }
      }
    }
  }
};
