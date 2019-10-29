![Avatar me logo](./assets/logo_avatar_me_npm_package_google_images.png)

Simple node module to retrieves a user avatar given an email or a user name from Google, gravatar or a default image.

**Changelog:** [Change all the changes to this project here](./CHANGELOG.md)

## How to use it?

```javascript
var avatarMe = require('avatar-me')

avatarMe.fetchAvatar('jorge@ferreiro.me', 'jorge', (err, avatar) => {
  if (err) console.log(err)
  console.log(avatar)
})
```

## Configuration? Yes, please!

### Basic configuration

```javascript
var avatarMe = require('avatar-me')

avatarMe.configure({
  defaultAvatar: 'mySuperAwesomeDefaultAvatar.png',
  defaultAvatarPath: 'http://my/super/awesome/path/to/default/images/'
})

avatarMe.fetchAvatar('jorge@ferreiro.me', 'jorge', (err, avatar) => {
  if (err) console.log(err)
  console.log(avatar)
})
```

### Cache configuration using Redis. No more extra api calls!

In **0.1.0** we have introduced support for caching API calls using Redis!

If you wanna use this feature, just add redis to the avatar me config and it will create a new redis client.

```javascript
var avatarMe = require('./index.js')

avatarMe.configure({
  defaultAvatar: 'mySuperAwesomeDefaultAvatar.png',
  defaultAvatarPath: 'http://my/super/awesome/path/to/default/images/',
  cache: {
	  host: '127.0.0.1',
	  port: '6379'
  },
  shouldFetchGmail: false,
  shouldFetchGravatar: false
})

avatarMe.fetchAvatar('jorge@ferreiro.me', 'jorge', (err, avatar) => {
	console.log(err)
	console.log(avatar)
})
```

## Contribute!

💬 [Create a new Pull Request](https://github.com/ferreiro/website/pulls)

## My social networks

If you have some doubts or want to stay in touch I'll be happy to help you out or collaborate on new projects. You can reach me here:

* Twitter: [https://www.twitter.com/jgferreiro](https://www.twitter.com/jgferreiro)
* Linkedin: [https://www.linkedin.com/in/jgferreiro/](https://www.linkedin.com/in/jgferreiro/)
* Instagram: [https://www.instagram.com/jgferreiro/](https://www.instagram.com/jgferreiro/)

Also you can find me on:
* **Website:** [Jorge Ferreiro >](http://www.ferreiro.me)
* **Contact:** [Contact form and email >](http://www.ferreiro.me/contact)
