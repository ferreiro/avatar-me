const async = require('async')
const gravatar = require('gravatar')
const validator = require('validator')
const request = require('request')

class AvatarMe {
  constructor () {
    this.defaultAvatar = 'default.png'
    this.defaultAvatarPath = '/static/images/avatar_tiles/v1/'
  }

  configure (config) {
    this.defaultAvatar = config.defaultAvatar ? config.defaultAvatar : this.defaultAvatar
    this.defaultAvatarPath = config.defaultAvatarPath ? config.defaultAvatarPath : this.defaultAvatarPath
  }

  fetchAvatar (email, username, callback) {
    if (!email) return callback(new Error('No email provided'), null)
    if (!username) return callback(new Error('No username provided'), null)
    if (!this.isValidEmail(email)) {
      let defaultImage = this.fetchDefaultImage(username)
      return callback(null, defaultImage)
    }

    async.parallel({
      gmail: (nextCb) => {
        this.fetchGoogleAvatar(email, (err, googleImage) => {
          return nextCb(null, googleImage)
        })
      },
      gravatar: (nextCb) => {
        this.fethGravatarImage(email, (err, gravatarImage) => {
          return nextCb(null, gravatarImage)
        })
      },
      default: (nextCb) => {
        return nextCb(null, this.fetchDefaultImage(username))
      }
    }, function(err, results) {
      if (err) return callback(err, null)
      if (results.gmail) return callback(null, results.gmail)
      if (results.gravatar) return callback(null, results.gravatar)
      return callback(err, results.default)
    })
  }

  isValidEmail (email) {
    return validator.isEmail(email)
  }

  fetchGoogleAvatar (email, callback) {
    const googleAvatarApi = 'https://picasaweb.google.com/data/entry/api/user/'
    const avatarUrl = googleAvatarApi + email + '?alt=json'

    request({
      method: 'GET',
      url: avatarUrl,
      gzip: true
    }, (e, r, response) => {
      try {
        if (!response || response.includes('Unable to find')) {
          return callback(new Error('Unable to find'), null)
        }
        const user = JSON.parse(String(response))
        const image = user.entry.gphoto$thumbnail.$t
        return callback(null, image)
      } catch (err) {
        return callback(new Error('Unable to find'), null)
      }
    })
  }

  fethGravatarImage (email, callback) {
    const gravatarUrl = gravatar.url(email, { protocol: 'https', s: '100', r: 'x', d: '404' })

    request({
      method: 'GET',
      url: gravatarUrl,
      format: 'json'
    }, (e, r, response) => {
      if (response === '404 Not Found') {
        return callback(null, null)
      }
      return callback(null, gravatarUrl)
    })
  }

  // Returns an image with the initial letter of the user

  fetchDefaultImage (username) {
    if (!username || username.length === 0) return this.defaultAvatarPath + 'default.png'

    const initialLetter = String(username[0]).toLowerCase()
    const defaultAvatarUrl = this.defaultAvatarPath + `${initialLetter}.png`

    return defaultAvatarUrl
  }
}

module.exports = AvatarMe
