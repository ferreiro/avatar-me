var avatarMe = require('./index.js')

avatarMe.configure({
  defaultAvatar: 'mySuperAwesomeDefaultAvatar.png',
  defaultAvatarPath: 'http://my/super/awesome/path/to/default/images/',
  cache: {
	  host: '127.0.0.1',
	  port: '6379'
  }
})

avatarMe.fetchAvatar('ferreiro.me@gmail.com', 'jorge', (err, avatar) => {
	console.log(err)
	console.log(avatar)
})
