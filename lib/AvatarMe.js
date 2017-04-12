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
    var that = this

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
      let url = ''

      if (results.gmail) {
        url = results.gmail
      } else if (results.gravatar) {
        url = results.gravatar
      } else {
        url = results.default
      }

      return callback(err, url)
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
      uri: avatarUrl,
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
    const avatar = gravatar.url(email, { s: '100', r: 'x', d: '404' })

    if (avatar.includes('d=404')) {
      return callback(new Error('Gravatar not found'), null)
    }
    callback(null, avatar)
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
