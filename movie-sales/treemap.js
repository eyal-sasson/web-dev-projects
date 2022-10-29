(async () => {
    const data = await d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json');
    const w = 1000;
    const h = 600;
    const svg = d3.select('main').append('svg').attr('width', w).attr('height', h);
    const root = d3.hierarchy(data).sum(d => d.value);
    const treemap = d3.treemap().size([w, h]).paddingInner(1)(root);
    const color = d3.scaleOrdinal(d3.schemeAccent).domain(data.children.map(obj => obj.name));
    const tip = d3
        .select("main")
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

    const cell = svg.selectAll('g')
        .data(treemap.leaves())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x0},${d.y0})`)
        .on('mousemove', function (event, d) {
            tip.transition().style('opacity', 0.9)
            tip.html(
                `
                    Name: ${d.data.name}
                    <br>Category: ${d.data.category}
                    <br>Value: ${d3.format('.2s')(d.data.value)}
                `
            )
                .attr('data-value', d.data.value)
                .style('left', event.pageX + 10 + 'px')
                .style('top', event.pageY - 28 + 'px');
        })
        .on('mouseout', () => tip.transition().style('opacity', 0));
    cell.append('rect')
        .attr('class', 'tile')
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr('fill', d => color(d.data.category))
        .attr('data-name', d => d.data.name)
        .attr('data-category', d => d.data.category)
        .attr('data-value', d => d.data.value)
    cell.append('text')
        .attr('class', 'tile-text')
        .selectAll('tspan')
        .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
        .enter()
        .append('tspan')
        .attr('font-size', '0.6rem')
        .attr('x', 4)
        .attr('y', (d, i) => 13 + 10 * i)
        .text(d => d);
    const legend = d3.select('main').append('svg').attr('id', 'legend').attr('width', 200).attr('height', 300)
    const legendElem = legend.selectAll('g')
        .data(data.children.map(obj => obj.name))
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * 25})`);
    legendElem.append('rect')
        .attr('class', 'legend-item')
        .attr('width', 20)
        .attr('height', 18)
        .attr('fill', d => color(d));
    legendElem.append('text')
        .text(d => d)
        .attr('width', 20)
        .attr('height', 18)
        .attr('x', 25)
        .attr('y', 15)
})();