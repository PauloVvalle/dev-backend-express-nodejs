const requestCountByIP = {};

const rateLimit = (req, res, next) => {
    const clientIp = req.ip;

    if(requestCountByIP[clientIp]) {
        if(requestCountByIP[clientIp] >= 50){
            return res.status(429).json({error: 'você atingiu o limite de requisição a cada 30 segundos'
            })    
        }
        requestCountByIP[clientIp]++;
    } else {
        requestCountByIP[clientIp] = 1;

        setTimeout(() => {
            delete requestCountByIP[clientIp];
        }, 30000)
    }
  next();
}

module.exports = rateLimit;