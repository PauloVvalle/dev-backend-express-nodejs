const filesSystem = require('fs');
const path = require('path');

const logMiddleware = (req, res, next) => {
    const newLog = {
        timestamp: new Date(),
        method: req.method,
        url: req.url,
        params: req.params,
        ip: req.ip

    }

    const logFilePath = path.join(__dirname, '../data/logs.json' );


    let existingLogs = [];

    try{
        existingLogs = JSON.parse(filesSystem.readFileSync(logFilePath))
    } catch (error) {
         existingLogs = [];
        console.log('erro ao ler arquivo de log')
    }

    existingLogs.push(newLog);

    filesSystem.writeFileSync(logFilePath, JSON.stringify(existingLogs, null, 2))

    next();
}

module.exports = logMiddleware;