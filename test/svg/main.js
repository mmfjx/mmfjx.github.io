
function addIconImg(item) {
    const root = d3.select(svg);
	var bounds = root.node().getBBox();
    const parent = document.getElementById('main');
	var fullWidth = parent.clientWidth,
	    fullHeight = parent.clientHeight;
	var width = bounds.width,
	    height = bounds.height;

	var scale = Math.max(width / fullWidth, height / fullHeight);


    const svgObject = document.getElementById('svgObject');
    const t1 = svgObject.contentDocument.querySelector(`#${item.id}`);
    const gRect = t1.getBoundingClientRect();
    const left = gRect.left;
    const top = gRect.top;
    const gWidth = gRect.width;
    const gHeight = gRect.height;
    const addGroup = d3
        .select(svg)
        .append('g')
        .data([item])
        .style('cursor', 'pointer')
        .attr('transform', `translate(${(left + gWidth / 2) * scale}, ${(top + gHeight / 2) * scale}) scale(${scale})`)
        .on('click', (event, data) => {
            // debugger;
            console.log(event, data, 'click');
            const target = event.target;
            const rect = target.getBoundingClientRect();



        });
    // console.log(t1.getBoundingClientRect(), svgObject.getBoundingClientRect(), t1, 'width 1');

    addGroup
        .append('circle')
        .attr('r', circleRadius)
        .attr('fill', colorPicker[item.status]);
    addGroup
        .append('image')
        .attr('width', iconWidth)
        .attr('height', iconHeight)
        .attr('x', -iconWidth / 2)
        .attr('y', -iconHeight / 2)
        .attr('href', pickIconUrl(item.type));

}


function pickIconUrl(type) {
    switch (type) {
        case 'humidity':
            return './images/icon-卡片-湿度.svg';
        case 'temperature':
            return './images/icon-卡片-温度.svg';
        case 'tempHumidity':
            return './images/icon-卡片-温湿度.svg';
        default:
            return './images/icon-卡片-温度.svg';
    }
}

function dragScroll() {
    const container = document.getElementById('main');

    const zoom = d3.zoom().extent([
        [0, 0],
        [container.clientWidth, container.clientHeight]
    ])
    .scaleExtent([0.5, 8])
    .translateExtent([[0, 0], [container.clientWidth, container.clientHeight]])
    .on('zoom', function zoomed({ transform }) {
        console.log(transform, 'transform');
        // debugger;
        const x = transform.x;
        const y = transform.y;
        const k = transform.k;
        d3.select(this).style('transform', `translate(${x}px, ${y}px) scale(${k})`);

        d3.select(this).style('transform-origin', '0 0');
    })
     d3.select(svg).call(zoom);
    window.zoom = zoom;
}

function zoomFit(paddingPercent, transitionDuration) {
    console.log(d3.zoomTransform(d3.select(svg).node()))
    const root = d3.select(svg);
	var bounds = root.node().getBBox();
    const parent = document.getElementById('main');
	var fullWidth = parent.clientWidth,
	    fullHeight = parent.clientHeight;
	var width = bounds.width,
	    height = bounds.height;
	var midX = bounds.x + width / 2,
	    midY = bounds.y + height / 2;
	if (width == 0 || height == 0) return; // nothing to fit
	var scale = (paddingPercent || 1) / Math.max(width / fullWidth, height / fullHeight);
	var translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];

    console.trace("zoomFit", translate, scale);
    root.style('transform', `translate(${translate.x}px, ${translate.y}px)`);
    root.style('transform-origin', '0 0');

}

function reset() {
    const root = d3.select(svg);
    root.style('transform', `translate(0px,0px) scale(1)`);
    root.style('transform-origin', '0 0');
}