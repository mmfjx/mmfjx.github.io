
/**
 * 求a、b的最大公约数
 * @param {*} a
 * @param {*} b
 */
function gcd(a,b){
    return b === 0 ? a : gcd(b, a % b);
}