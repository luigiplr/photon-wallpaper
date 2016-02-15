import Promise from 'bluebird'
import moment from 'moment'


class Scheduler {
    constructor(syncSetting, lastSync = moment()) {
        this.syncSetting = syncSetting.replace(' ', '_').toLowerCase()
        this.lastSync = lastSync
    }

    get next() {
        switch (this.syncSetting) {
            case 'every_30_minutes':
                return moment().minute(0).second(0).millisecond(0).add(30, 'minutes')
                break
            case 'every_hour':
                return moment().minute(0).second(0).millisecond(0).add(1, 'hour')
                break
            case 'every_day':
                return this.lastSync.hour(0).minute(0).second(0).millisecond(0).add(1, 'days')
                break
            case 'bi-daily':
                return this.lastSync.hour(0).minute(0).second(0).millisecond(0).add(2, 'days')
                break
            case 'every_week':
                return this.lastSync.day(0).hour(0).minute(0).second(0).millisecond(0).add(1, 'week')
                break
            case 'every_month':
                return this.lastSync.month(this.lastSync.month()).date(1).hour(0).minute(0).second(0).millisecond(0).add(1, 'month')
                break
        }
    }
}



export default Scheduler