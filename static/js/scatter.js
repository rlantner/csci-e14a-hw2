'use strict';

// IIFE
(function () {

    // Init data
    let data = [];

    // Fetch json data
    d3.json('/load_data', (d) => {

        // Parse
        return d.forEach(function (d) {
            d.experience_yr = +d.experience_yr;
            d.hw1_hrs = +d.hw1_hrs;
            d.age = +d.age;
        })
    }).then((d) => {

        // Redefine data
        data = d['users'];

        createVis();

    }).catch((err) => {

        console.error(err);
    });

   
    function createVis() {

        // Get svg
        const svg = d3.select('#scatter');

        // Config container
        const margin = {'top': 25, 'right': 5, 'bottom': 70, 'left': 70};
        const width = +svg.attr('width') - (margin.right + margin.left);
        const height = +svg.attr('height') - (margin.top + margin.bottom);

        // Create and position container
        const container = svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${margin.left}px, ${margin.top}px)`);

        //  Scales
        const scX = d3.scaleLinear()
            .domain(d3.extent(data, (d) => {
                return d.experience_yr;
            })).nice()
            .range([0, width]);

        const scY = d3.scaleLinear()
            .domain(d3.extent(data, (d) => {
                return d.hw1_hrs;
            })).nice()
            .range([height, 0]);

        const scRad = d3.scaleSqrt()
            .domain(d3.extent(data, (d) => {
                return d.age;
            })).nice()
            .range([2, 5]);


        // Generate bubbles
        const bubbles = container.selectAll('.bubble')
            .data(data)
            .enter()
            .append('circle')
            .attr('class','bubble')
            .attr('r', d => {
                return scRad(d.age);
            })
            .attr('cx', d => {
                return scX(d.experience_yr);
            }) // center x coordinate
            .attr('cy', d => {
                return scY(d.hw1_hrs);
            }) // center y coordinate
            .attr('fill', 'rgba(0, 0, 0, 0.75)')
            .style("fill", "#1b7688");
        

        // Generate x- and y-axis

        // xAxis
        const xAxis = d3.axisBottom()
            .scale(scX)
            .ticks(4);

        const xAxisPadding = 10;

        container.append('g')
            .style('transform', `translate(0, ${height + xAxisPadding}px)`)
            .call(xAxis);

        // yAxis
        const yAxis = d3.axisLeft()
            .scale(scY)
            .ticks(3);

        const yAxisPadding = -10;

        container.append('g')
            .style('transform', `translate(${yAxisPadding}px, 0)`)
            .call(yAxis);


        // Set xLabel and yLabel

        const xLabelPadding = 55;

        const xLabel = container.append('g')
            .style('transform', `translate(${width / 2}px, ${height + xLabelPadding}px`)
            .append('text')
            .text('Experience')
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px');

        const yLabelPadding = -55;

        const yLabel = container.append('g')
            .style('transform', `rotate(270deg) translate(${-height / 2}px, ${yLabelPadding}px)`)
            .append('text')
            .text('HW1 Hours')
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px');
        

    }

})();
