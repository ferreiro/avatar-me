const redis = require('redis')

class AvatarMeCache {
  constructor (config) {
    this.client = redis.createClient(config)
  }

  getCachedValue (key) {
    return new Promise((resolve, reject) => {
      if (!this.client) reject(new Error('No redis instance found'))

      this.client.get(key, (err, data) => {
        if (err) return reject(err)
        if (!data) return reject(new Error('No data available'))
        return resolve(JSON.parse(data))
      })
    })
  }

  setCachedValue (key, value, ttl) {
    const valueStr = JSON.stringify(value)

    if (!this.client) return
    this.client.set(key, valueStr)
    this.client.expire(key, ttl || 3600)
  }
}

module.exports = AvatarMeCache
