'use strict';

const { Thing } = require('abstract-things');
const { Dimmable } = require('abstract-things/lights');

module.exports = Thing.mixin(Parent => class extends Parent.with(Dimmable) {
	propertyUpdated(key, value) {
		if (key === 'brightness') {
			this.updateBrightness(value);
		}

		if (key === 'nlBrightness') {
			this.emitEvent('updateMoonlightBrightness', value)
		}

		super.propertyUpdated(key, value);
	}
});
