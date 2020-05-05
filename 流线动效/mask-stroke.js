let maskStroke = ({dom, path, width, height, id, lineWidth=50, strokeWidth=4, time=1000, pathReverse}) => {
    if (!width && !height) {
        let rect = dom.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
    }
    if (!id) {
        id = `strokeMotionMask_${Math.random().toString(36).slice(-8)}_`;
    }

    let $svg = d3.select(dom).append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('preserveAspectRatio', 'none')
        // .attr('viewBox', `0 0 ${width} ${height}`)
        // .style('position', 'absolute')
        // .style('left', '0')
        // .style('top', '0');
        $svg.append('path')
        .attr('d', path)
        .attr('stroke', '#aaaaaa');
    let $path = $svg.append('path')
        .attr('d', path);
    let pathLength = $path.node().getTotalLength();
    let pathPosArr = [];
    for (let i = 0; i < pathLength; i++) {
        let {x, y} = $path.node().getPointAtLength(i);
        pathPosArr.push({x, y});
    }
    pathReverse && pathPosArr.reverse();
    let getPathPosition = (length) => {
        length = parseInt(length);
        length = length > pathLength ? pathLength : length;
        return pathPosArr[length];
    };

    let maskId = id + 'mask';
    let linearId = id + 'linear';

    let linear = $svg.append('radialGradient')
        .attr('id', linearId)
        .attr('gradientUnits', 'objectBoundingBox')
        .attr('cx', '0.5')
        .attr('cy', '0.5');
    linear.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#fff')
        .attr('stop-opacity', '1');
    linear.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#fff')
        .attr('stop-opacity', '0');

    let $mask = $svg.append('mask').attr('id', maskId);
    let $maskCircle = $mask
        .append('circle')
        .style('will-change', 'auto')
        .attr('cx', '0')
        .attr('cy', '0')
        .attr('r', lineWidth)
        .attr('fill', `url(#${linearId})`); // red

    $path
        .style('will-change', 'auto')
        .style('fill', 'none')
        .style('stroke', '#f00')
        .style('stroke-width', strokeWidth)
        .style('mask', `url(#${maskId})`);

    let distance = 0;
    let times = time / 16.6;
    let step = pathLength / times;
    let isStop = false;
    let raf = () => {
        if (isStop) { return void 0; }
        // let {x, y} = $path.node().getPointAtLength(distance); // 此行代码会造成非常严重的性能损耗
        let {x, y} = getPathPosition(distance);
        // console.log(x, y, distance);
        $maskCircle.attr('cx', x).attr('cy', y);
        distance += step;
        if (distance >= pathLength) {
            distance = 0;
        }
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    let stop = () => isStop = true;
    return { stop };
};

export default maskStroke;
