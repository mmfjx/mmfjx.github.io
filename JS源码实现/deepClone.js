function deepClone(sourceObj){
    let targetObj = Array.isArray(sourceObj) ? [] : {};
    for(let key in sourceObj) {
        if(sourceObj.hasOwnProperty(key)) {
            if(sourceObj[key] && typeof sourceObj[key] === 'object') {
                targetObj[key] = deepClone(sourceObj[key]);
            } else {
                targetObj[key] = sourceObj[key];
            }
        }
    }
    return targetObj;
}