function sum(arr){
    if(!arr || arr.length == 0){
        return 0.0
    }
    return arr.map(a => isValidNumber(a) ? a : 0.0).reduce((pre, cur) => {
        return pre + cur
    })
}

function isValidNumber(num) {
    return num && !isNaN(num) && isFinite(num)
}

function invalidNumberToZero(num){
    return (!num || isNaN(num) || !isFinite(num)) ? 0.0 : num
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10)
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            default: 
                return 0
    } 
} 

// 浮点数比较
function floatEqual(one, another, diff){
    diff = diff ? diff : Number.EPSILON
   return Math.abs(invalidNumberToZero(one) - invalidNumberToZero(another)) < diff
}

// double 连乘计算
function multiply(nums){
    if(!nums 
        || !nums.length 
        || nums.length == 0
        || floatEqual(nums[0], 0.0, Number.EPSILON)){
        return 0.0
    }
    let result = nums[0]
    for(let i = 1; i < nums.length; i++){
        if(floatEqual(nums[i], 0.0, Number.EPSILON)){
            return 0.0
        }
        result *= nums[i]
    }
    return result
}

// Double 除法,保留若干位
function divide(dividend, divisor){
    return invalidNumberToZero(dividend / divisor)
}

function average(arr, excludeInvalidValue){
    if(!arr || arr.length == 0){
        return 0.0
    }
    const totalSum  = sum(arr)
    const length = excludeInvalidValue ? arr.filter(e => isValidNumber(e)).length : arr.length
    return totalSum / length
}

module.exports = {
    sum, 
    invalidNumberToZero,
    randomNum,
    floatEqual,
    multiply,
    divide,
    isValidNumber,
    average,
}