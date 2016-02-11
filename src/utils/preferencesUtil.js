import ls from 'local-storage';
import _ from 'lodash';
import {
    EventEmitter
}
from 'events';

const defaultSettings = {
    startOnLogin: true,
    minimizeToTray: true
};

const SettingsEmitter = new EventEmitter();

export
default class {
    constructor() {
        this.emitter = SettingsEmitter;
        this.settings = {};

        _.forEach(defaultSettings, (value, index) => {
            if (typeof value === 'object') {
                this.settings[index] = {};
                _.forEach(value, (subValue, subValueIndex) => {
                    let parm = index + ':' + subValueIndex;
                    if (!ls.isSet(parm))
                        this.settings[index][subValueIndex] = this.getAndSet(parm, subValue);
                    else
                        this.settings[index][subValueIndex] = ls.get(parm);
                });
            } else {
                if (!ls.get(index))
                    this.settings[index] = this.getAndSet(index, value);
                else
                    this.settings[index] = ls.get(index);
            }
        });
    }

    set(setting, value) {
        if (setting.includes(':')) {
            let splitSetting = setting.split(':');
            this.settings[splitSetting[0]][splitSetting[1]] = value;
        } else
            this.settings[setting] = value;
        ls.set(setting, value);
        this.emitter.emit(setting, value);
    }

    getAndSet(setting, value) {
        ls.set(setting, value);
        this.emitter.emit(setting, value);
        return value;
    }
};