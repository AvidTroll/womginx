const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port and hostname
const PORT = 8080;
const HOSTNAME = 'localhost';

// Create the server
const server = http.createServer((req, res) => {
    // Get the requested file's path
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Determine the content type
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'font/woff',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'font/otf',
        '.wasm': 'application/wasm',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read the requested file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                fs.readFile(path.join(__dirname, '404.html'), (err, errorContent) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(errorContent, 'utf-8');
                });
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(PORT, HOSTNAME, () => {
    console.log(`ts (this) running at http://${HOSTNAME}:${PORT}/`);
});
