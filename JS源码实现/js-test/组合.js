/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    candidates.sort((a, b) => a - b );
    let res = [];
    dfs(candidates, 0, target, [], res);
    return res;
};

function dfs(candidates, start, target, path, res) {
    debugger
    if (target === 0) {

        res.push(path);
        return;
    }
    for (let i = start; i < candidates.length; i++) {
        if (target < candidates[i]) {
            break;
        }
        path.push(candidates[i]);
        dfs(candidates, i, target - candidates[i], path.slice(), res);
        path.pop();

    }
}

combinationSum([2, 3, 6, 7], 7);
