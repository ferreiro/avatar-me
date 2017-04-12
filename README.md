# avatar-me
Simple node module to retrieves a user avatar given an email or a user name

# How to use it?

```javascript
var avatarMe = require('avatar-me')

avatarMe.fetchAvatar('jorge@ferreiro.me', 'jorge', (err, avatar) => {
  if (err) console.log(err)
  console.log(avatar)
})
```

# Configuration? Yes, please!


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
