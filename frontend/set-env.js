const fs = require('fs');

// Netlify inyectará la variable API_URL desde su panel de control
const apiUrl = process.env.API_URL || 'http://localhost:3000';

const envConfigFile = `(function(window) {
  window.env = window.env || {};
  window.env.apiUrl = "${apiUrl}";
})(this);`;

// En Angular v18+, los assets se manejan en la carpeta 'public'
const dir = './public';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

fs.writeFileSync(`${dir}/env.js`, envConfigFile);
console.log('✅ public/env.js generado con éxito');