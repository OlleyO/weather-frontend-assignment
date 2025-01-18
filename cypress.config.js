import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 10000,
  retries: 3,
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--use-fake-device-for-media-stream');  // Optional for fake media
          launchOptions.args.push('--use-fake-ui-for-media-stream');      // Fake UI for permission
          launchOptions.args.push('--enable-geolocation');
          launchOptions.args.push('--allow-insecure-localhost');          // Optional for local testing
          launchOptions.args.push('--auto-select-desktop-capture-source=Entire screen');

          // Set default geolocation
          launchOptions.preferences.default = {
            'profile': {
              'content_settings': {
                'exceptions': {
                  'geolocation': {
                    '[*.]localhost:5173': {
                      'setting': 1 // Allow geolocation for localhost
                    }
                  }
                }
              }
            }
          };
        }
        return launchOptions;
      });
    },
  },
});
