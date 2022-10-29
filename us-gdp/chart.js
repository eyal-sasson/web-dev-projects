async function fetchData(url) {
    let res = await fetch(url);
    let json = await res.json();
    return json.data;
}
(async () => {
    const w = 900;
    const h = 500;
    const padding = 50;
    const svg = d3.select('main').append('svg').attr('width', w).attr('height', h);
    const data = await fetchData('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    console.log(data);
    const xScale = d3.scaleTime()
        .domain([d3.min(data, d => new Date(d[0])), new Date(d3.max(data, d => new Date(d[0])))])
        .range([padding, w - padding]);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[1])])
        .range([h - padding, padding]);
    let tooltip = d3.select('main').append('div').attr('id', 'tooltip').style('top', h-50+'px');
    svg.selectAll('rect').data(data).enter().append('rect')
        .attr('class', 'bar')
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])
        .attr('width', w / 275)
        .attr('height', d => h - padding - yScale(d[1]))
        .attr('x', d => xScale(new Date(d[0])))
        .attr('y', d => yScale(d[1]))
        .on('mouseover', ({}, d) => {
            const date = new Date(d[0]);
            tooltip.transition().style('opacity', 0.9);
            tooltip.html(
                date.getFullYear() + ' Q' + (Math.floor(date.getMonth() / 3) + 1) + '<br>'
                + '$' + d[1].toLocaleString()
            )
            .attr('data-date', d[0])
            .style('left', xScale(new Date(d[0])) + 50 + 'px');
        })
        .on('mouseout', () => {
            tooltip.transition().style('opacity', 0);
        });
    const xAxis = d3.axisBottom(xScale).ticks(d3.timeYear.every(5));
    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${h - padding})`)
        .call(xAxis);
    svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`)
        .call(yAxis);
})();
