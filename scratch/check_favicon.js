
const fs = require('fs');
const path = 'public/favicon.png';
if (fs.existsSync(path)) {
    const stats = fs.statSync(path);
    console.log(`File size: ${stats.size} bytes`);
} else {
    console.log('File not found');
}
