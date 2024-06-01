function freeze(obj) {
  Object.freeze(obj)
  Object.keys(obj).forEach(function (v) {
    if (typeof obj[v] === 'object') {
        freeze(obj[v])
    }
  })
}


module.exports = {
    freeze, 
}