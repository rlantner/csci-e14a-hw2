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


    // Function createVis

    function createVis() {

        // Total users calculation
        totalUsers();

        // Age distribution histogram

        // Get svg
        const svg = d3.select('#barChart');

        // Config
        const margin = {'top': 25, 'right': 100, 'bottom': 70, 'left': 10};
        const width = +svg.attr('width') - (margin.right + margin.left);
        const height = +svg.attr('height') - (margin.top + margin.bottom);

        // Create and position container
        const container = svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${margin.left}px, ${margin.top}px)`);

        // Set ageMap


        // X Scale

        var scX = d3.scaleLinear()
            .domain(d3.extent(data, (d) => {
                return d.age;
            })).nice()
            .range([0, width]);


        // Histogram and bins

        var histogram = d3.histogram()
            .value(function(d) { return d.age; })
            .domain(scX.domain())
            .thresholds(scX.ticks(10));

        var bins = histogram(data);

        console.log(bins);
        

        // Y Scale

        var scY = d3.scaleLinear()
            .range([height, 0]);

            scY.domain([0, d3.max(bins, function(d) { return d.length; })]);


        // Config transition
        

        // Create bars
       

        // Create rects

        const bars = container.selectAll('.bar')
            .data(bins)
            .enter()
            .append('rect')
            .attr('class','bar')
            .attr("x", 0)
            .attr("width", 20)
            .attr("transform", function(d) { return "translate(" + scX(d.x0) + "," + scY(d.length) + ")"; })
            .attr("height", function(d) { return height - scY(d.length); })
            .style("fill", "#9b0a0a")
      

        // Add y-label


        // Add x-axis

        const xAxis = d3.axisBottom()
            .scale(scX)
            .ticks(5);

        const xAxisPadding = 10;

        container.append('g')
            .style('transform', `translate(0, ${height + xAxisPadding}px)`)
            .call(xAxis);        

        // Add x-label

        const xLabelPadding = 55;

        const xLabel = container.append('g')
            .style('transform', `translate(${width / 2}px, ${height + xLabelPadding}px`)
            .append('text')
            .text('Age')
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px');
        

    }

    function totalUsers() {

        // init totalUsers

        const totalUsers = data.length;

        // append totalUsers to h3#total_users_text
        
        d3.select('#total_users_text')
            .append('span')
            .text(`${totalUsers}`);

    }


})();
