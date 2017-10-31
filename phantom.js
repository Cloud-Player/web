function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');

// Optional: set logging level of launcher to see its output.
// Install it using: yarn add lighthouse-logger
// const log = require('lighthouse-logger');
// log.setLevel('info');

/**
 * Launches a debugging instance of Chrome.
 * @param {boolean=} headless True (default) launches Chrome in headless mode.
 *     False launches a full version of Chrome.
 * @return {Promise<ChromeLauncher>}
 */
function launchChrome(headless) {
  return chromeLauncher.launch({
    enableExtensions: true,
    // port: 9222, // Uncomment to force a specific port of your choice.
    chromeFlags: [
      '--mute-audio=false',
      '--window-size=0,0',
      '--disable-gpu',
      headless ? '--headless' : ''
    ]
  });
}
launchChrome(true).then(function(chrome){
  _asyncToGenerator(function* () {

    var chrome = yield launchChrome();
    var protocol = yield CDP({ port: chrome.port });

    // Extract the DevTools protocol domains we need and enable them.
    // See API docs: https://chromedevtools.github.io/devtools-protocol/
    var Page = protocol.Page;
    var Runtime = protocol.Runtime;

    yield Page.enable();

    Page.navigate({ url: 'http://youtube.com/' });

    // Wait for window.onload before doing stuff.
    Page.loadEventFired(_asyncToGenerator(function* () {
      var manifest = yield Page.getAppManifest();

      if (manifest.url) {
        console.log('Manifest: ' + manifest.url);
        console.log(manifest.data);
      } else {
        console.log('Site has no app manifest');
      }

      const js = "document.querySelector('title').textContent";
      // Evaluate the JS expression in the page.
      const result = yield Runtime.evaluate({expression: js});

      console.log('Title of page: ' + result.result.value);

      //protocol.close();
      //chrome.kill(); // Kill Chrome.
    }));
  })();
});
