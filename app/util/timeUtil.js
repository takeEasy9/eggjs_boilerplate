const constantUtil = require('../util/constantUtil.js')
const {format, } = require('date-and-time');

function isNotInTradingTime(time, strict){
    if(!time){
      return true
    }
    if(strict){
        return time < constantUtil.FIRST_HALF_START_TIME
               || time > constantUtil.SECOND_HALF_END_TIME
               || (time > constantUtil.FIRST_HALF_END_TIME && time < constantUtil.SECOND_HALF_START_TIME)

    } else {
        return time < constantUtil.FIRST_HALF_START_TIME
               || time >= constantUtil.LENIENT_SECOND_HALF_END_TIME
               || (time >= constantUtil.LENIENT_FIRST_HALF_END_TIME && time < constantUtil.SECOND_HALF_START_TIME)
    }
}

function isInTradingTime(time, strict){
    return !isNotInTradingTime(time, strict)
}

function getCurrentDate(dateFormat){
    return dateFormat ? format(new Date(), dateFormat) : format(new Date(), constantUtil.DATE_FORMART)
}

function getHalfTimeRange(currentTime){
    if(!currentTime){
        currentTime = format(new Date(), constantUtil.TIME_FORMART)
    }
    if(currentTime < '12:15:00'){
        return {halfStartTime: constantUtil.FIRST_HALF_START_TIME, halfEndTime: constantUtil.LENIENT_FIRST_HALF_END_TIME}
    } else {
        return {halfStartTime: constantUtil.SECOND_HALF_START_TIME, halfEndTime: constantUtil.LENIENT_SECOND_HALF_END_TIME}
    }
}

function getCurrentMinute(haveDate){
    if (haveDate){
        return format(new Date(), constantUtil.DATE_TIME_FORMART).slice(0, 16) + ":00"
    } else {
        return format(new Date(), constantUtil.DATE_TIME_FORMART).slice(11, 16) + ":00"
    }
}

function getCurrentTime(dataTimeFormat) {
    const dtFormat = dataTimeFormat ? dataTimeFormat: constantUtil.TIME_FORMART
    return format(new Date(), dtFormat)
}

function isNotInSyncTimeRange(currentSyncTime) {
    const currentTime = currentSyncTime ? currentSyncTime : getCurrentTime(constantUtil.TIME_FORMART)
    return currentTime < constantUtil.FIRST_HALF_SYNC_START_TIME
            || currentTime > constantUtil.SECOND_HALF_SYNC_END_TIME
            || (currentTime > constantUtil.FIRST_HALF_SYNC_END_TIME &&  currentTime < constantUtil.SECOND_HALF_SYNC_START_TIME)
}

function isInPriceMinuteRange(minute) {
    const tradeMinute = minute ? minute : format(new Date(), constantUtil.TIME_FORMART)
    return (tradeMinute >= constantUtil.FIRST_HALF_START_TIME && tradeMinute <= constantUtil.FIRST_HALF_END_TIME)
    || (tradeMinute >= constantUtil.SECOND_HALF_START_TIME && tradeMinute <= constantUtil.SECOND_HALF_END_TIME)
}

module.exports = {
    isNotInTradingTime, 
    isInTradingTime,
    getCurrentDate,
    getHalfTimeRange,
    getCurrentMinute,
    getCurrentTime,
    isNotInSyncTimeRange,
    isInPriceMinuteRange,
}