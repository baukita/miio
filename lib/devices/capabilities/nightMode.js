'use strict';

const { Thing, State } = require('abstract-things');
const MiioApi = require('../../device');

module.exports = Thing.mixin(
	(Parent) =>
		class extends Parent.with(State) {
			static get capability() {
				return 'miio:nightmode';
			}

			static availableAPI(builder) {
				builder
					.event('nightModeChanged')
					.type('boolean')
					.description('Night mode state has changed')
					.done();

				builder
					.action('nightMode')
					.description('Activates night mode')
					.argument('number', false, 'The brightness of the night mode')
					.done();

					builder.action('setNightMode')
					.description('Set if night mode is active')
					.argument('number', false, 'The brightness of the night mode')
					.returns('boolean', 'If night mode is on')
					.done();
		
				builder.action('getNightMode')
					.description('Get if night mode is active')
					.returns('boolean', 'If night mode is on')
					.done();
			}

			propertyUpdated(key, value) {
				if (key === 'nightMode') {
					if (this.updateState('nightMode', value)) {
						this.emitEvent('nightModeChanged', value);
					}
				}

				super.propertyUpdated(key, value);
			}

			nightMode(brightness) {
				if (typeof brightness === 'undefined') {
					return this.getNightMode();
				}

				return this.setNightMode(brightness);
			}

			getNightMode() {
				this.getState('nightMode');
			}

			setNightMode(brightness) {
				return this.changeNightMode(brightness).then(() => this.getNightMode());
			}

			changeNightMode(brightness) {
				return this.call('set_scene', ['nightlight', brightness || 10], {
					refresh: [
						'colorRGB',
						'colorMode',
						'brightness',
						'power',
						'colorTemperature',
						'nightMode'
					],
				}).then(MiioApi.checkOk);
			}
		}
);
