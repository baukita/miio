'use strict';

const { Thing, Mode, SwitchableMode } = require('abstract-things');
const MODES = ['default', 'daylight', 'moonlight']

module.exports = Thing.mixin(
	(Parent) =>
		class extends Parent.with(Mode, SwitchableMode) {
			static get capability() {
				return 'miio:nightmode';
			}

			initCallback() {
				return super.initCallback().then(() => this.updateModes(MODES));
			}

			propertyUpdated(key, value) {
				if (key === 'activeMode' && value) {
					this.updateMode(value)
					this.updatePower(value === 'daylight')
				}

				super.propertyUpdated(key, value);
			}

			async changeMode(newMode) {
				const powerMode = newMode === 'daylight' ? 1 : newMode === 'moonlight' ? 5 : 0
				return await this.changePower(true, powerMode)
			}
		}
);
