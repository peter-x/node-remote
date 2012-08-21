var x11 = require('x11/lib/x11'),
	spawn = require('child_process').spawn;
	log = require('sys').puts;
	keyMapper = require('./keyMapper.js');


function XManager(XDisplayClient){
	self = this;
	self.X = XDisplayClient;
	self.root = X.display.screen[0].root;
	
	var min = X.display.min_keycode;
	var max = X.display.max_keycode;
	self.X.GetKeyboardMapping(min, max-min, function(list){ 
		keyMapper.createMapper(list, min, function(mapper){
			self.keyMapper = mapper;	
		});
	});
}

XManager.prototype.keyRelease = function (keyCode){
	X.require('xtest', function(test) {
			test.FakeInput(test.KeyRelease, self.keyMapper.mapKey(keyCode), 0, root, 0, 0);
	});
}

XManager.prototype.keyPress = function (keyCode){
	X.require('xtest', function(test) {
			test.FakeInput(test.KeyPress, self.keyMapper.mapKey(keyCode), 0, root, 0,0);
	});
}

module.exports.createXManager = function(cb){
	x11.createClient(function(display) {
		X = display.client;
		XManager = new XManager(X);
		cb(XManager);
	});
}

