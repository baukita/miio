'use strict';

const YeelightColor = require('./devices/yeelight.color');
const YeelightMono = require('./devices/yeelight.mono');

module.exports = {
	'yeelink.light.lamp1': YeelightMono,
	'yeelink.light.mono1': YeelightMono,
	'yeelink.light.ceiling22': YeelightMono,
	'yeelink.light.ceiling5': YeelightMono,

	'yeelink.light.color1': YeelightColor,
	'yeelink.light.strip1': YeelightColor,
	'yeelink.light.color3': YeelightColor,
	'yeelink.light.bslamp2': YeelightColor,

	color: YeelightColor,
	mono: YeelightMono,
};
