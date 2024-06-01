// 判断 集合 是否为空
function isEmpty(collection){
    return !collection
            || !collection.size
            || collection.size == 0
}

// 判断 集合 是否不为空
function isNotEmpty(collection){
    return !isEmpty(collection)
}

// 获取 map 第一项
function getFirstEntry(map){
    return isEmpty(map) ? undefined : Array.from(map)[0]
}

// 获取 map 最后一项
function getLastEntry(map){
    return isEmpty(map) ? undefined : Array.from(map)[map.size - 1]
}

function sortByKey(map){
    if(isEmpty(map)){
        return map
    } else {
        const arrayObj = Array.from(map)
        arrayObj.sort((one, another) => {return one[0].localeCompare(another[0])})
        map.clear()
        for (var [key, value] of arrayObj) {
            map.set(key, value)
        }
    }
}

module.exports = {
    isEmpty,
    isNotEmpty,
    getFirstEntry,
    getLastEntry,
    sortByKey,
}