const fs = require('fs-extra');

const serverConfigPath = './build/server.js';

if (fs.existsSync(serverConfigPath)) {
  fs.unlinkSync(serverConfigPath);
}

fs.copySync('./config/server.js', serverConfigPath);
