const redis = require('redis')
let client = null

class AvatarMeCache {
  constructor (config) {
    client = redis.createClient(config)
  }

  getCachedValue (key) {
    return new Promise((resolve, reject) => {
      if (!client) reject(new Error('No redis instance found'))

      client.get(key, (err, data) => {
        if (err) return reject(err)
        if (!data) return reject(new Error('No data available'))
        return resolve(JSON.parse(data))
      })
    })
  }
  setCachedValue (key, value, ttl) {
    if (!this.client) return
    const valueStr = JSON.stringify(value)

    client.set(key, valueStr)
    client.expire(key, ttl || 3600)
  }
}

module.exports = AvatarMeCache
