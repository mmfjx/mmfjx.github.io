let linearStroke = ({dom, path, width, height, id, lineWidth=100, strokeWidth=4, time=1000, x1, y1, x2, y2, isFill}) => {
    if (!width && !height) {
        let rect = dom.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
    }
    if (!id) {
        id = `strokeMotionLinear_${Math.random().toString(36).slice(-8)}_`;
    }

    let $svg = d3.select(dom).append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('preserveAspectRatio', 'none')

        // .style('position', 'absolute')
        // .style('left', '0')
        // .style('top', '0');
    $svg.append('path')
        .attr('d', path)
        .attr('stroke', '#aaaaaa');
    let $path = $svg.append('path')
        .attr('d', path);
    let linearId = id;
    let pathLength = $path.node().getTotalLength();

    let $linear = $svg.append('linearGradient')
        .attr('id', linearId)
        .attr('gradientUnits', 'objectBoundingBox');
    let linearArr = [
        {'offset': 0, 'stop-opacity': 0, 'stop-color': '#99ECFF'},
        {'offset': .3, 'stop-opacity': .3, 'stop-color': '#99ECFF'},
        {'offset': .5, 'stop-opacity': .75, 'stop-color': '#f00'},
        {'offset': .7, 'stop-opacity': .3, 'stop-color': '#99ECFF'},
        {'offset': 1, 'stop-opacity': 0, 'stop-color': '#99ECFF'},
    ];
    linearArr.forEach((item, index) => {
        let linearFieldObj = linearArr[index];
        $linear.append('stop')
            .attr('offset', linearFieldObj['offset'])
            .attr('stop-opacity', linearFieldObj['stop-opacity'])
            .attr('stop-color', linearFieldObj['stop-color']);
    });
    if (!x1) {x1 = '0%';}
    if (!y1) {y1 = '0%';}
    if (!x2) {x2 = `${ lineWidth / pathLength * 100}%`;}
    if (!y2) {y2 = '0%';}
    $linear
        .attr('spreadMethod', 'pad')
        .attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2);

    $path
        .attr('fill', 'none')
        .attr('stroke', `url(#${linearId})`)
        .attr('stroke-width', strokeWidth);
    isFill && $path.attr('fill', `url(#${linearId})`);

    let isStop = false;

    // TODO repeat参数控制
    let repeat = () => {
        if (isStop) {return void 0;}
        $linear.attr('gradientTransform', 'translate(-0.1, -0.1)')
            .transition()
            .attr('gradientTransform', 'translate(1, 1)') // 0.72
            .duration(time)
            .ease(d3.easeLinear)
            .on('end', () => {
                $linear
                    .transition()
                    .attr('gradientTransform', 'translate(-0.1, -0.1)')
                    .duration(time)
                    .ease(d3.easeLinear)
                    .on('end', () => {
                        repeat();
                    });
            });
    };
    repeat();
    let stop = () => isStop = true;
    return { stop };
};

export default linearStroke;
