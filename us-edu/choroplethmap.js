(async () => {
    const us = await d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json');
    const edu = await d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json');
    const w = 1000;
    const h = 600;
    const svg = d3.select('main').append('svg').attr('width', w).attr('height', h);
    const tip = d3.tip()
        .attr('id', 'tooltip')
        .html(d => d)
        .offset([0, -15]);
    svg.call(tip);
    const color = d3.scaleSequential(d3.interpolateGreens).domain(d3.extent(edu, obj => obj.bachelorsOrHigher));
    const [minEd, maxEd] = color.domain();
    console.log(minEd, maxEd)
    svg.append('g')
        .selectAll('path')
        .data(topojson.feature(us, us.objects.counties).features)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')
        .attr('data-fips', d => d.id)
        .attr('data-education', d => educationData(edu, d.id).bachelorsOrHigher)
        .attr('fill', d => color(educationData(edu, d.id).bachelorsOrHigher))
        .on('mouseover', function (event, d) {
            const data = educationData(edu, d.id);
            const str = `${data['area_name']}, ${data.state}: ${data.bachelorsOrHigher}%`;
            tip.attr('data-education', data.bachelorsOrHigher)
            tip.show(str, this);
        })
        .on('mouseout', tip.hide);
    const legend = svg.append('g')
        .attr('id', 'legend')
        .attr("transform", "translate(600, 50)")
    const legendValues = d3.range(minEd, maxEd, (maxEd - minEd) / 5);
    legend.selectAll('rect')
        .data(legendValues)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 50)
        .attr('width', 50)
        .attr('height', 10)
        .attr('fill', d => color(d));
    const legendX = d3.scaleLinear().domain([minEd, maxEd]).range([0, 250]);
    const legendAxis = d3.axisBottom(legendX).tickValues(legendValues.concat(maxEd)).tickFormat(v => Math.round(v)+'%').tickSize(10);
    console.log(legendAxis.tickValues())
    legend.append('g')
        .attr('transform', 'translate(0, 0)')
        .call(legendAxis)
        .select('.domain').remove();
})();

function educationData(education, id) {
    return education.filter(obj => obj.fips == id)[0]
}