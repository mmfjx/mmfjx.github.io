/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。
说明：

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。
 */
var combinationSum2 = function(candidates, target) {

    candidates.sort((a, b) => a - b)
    let res = [];
    dfs(candidates, 0, target, [], res)
    return res;
};

function dfs(candidates, start, target, path, res) {
    if (target === 0) {
        res.push(path);
        return;
    }
    for (let i= start; i < candidates.length; i++) {
        if (target < candidates[i]) {
            break;
        }
        if (i > start && candidates[i - 1] === candidates[i]) {
            continue;
        }
        path.push(candidates[i])
        dfs(candidates, i + 1, target - candidates[i], path.slice(), res);
        path.pop();
    }
}

console.log(combinationSum2([10,1,2,7,6,1,5], 8))