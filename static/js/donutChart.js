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
        const svg = d3.select('#donutChart');

        // Config
        const margin = {'top': 20, 'right': 20, 'bottom': 20, 'left': 20};
        const width = +svg.attr('width') - (margin.right + margin.left);
        const height = +svg.attr('height') - (margin.top + margin.bottom);

        // Create and position container
        const container = svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${(width / 2) + margin.left}px, ${(height / 2) + margin.top}px)`);

    
        // PART 1
        // ------ YOUR CODE GOES HERE --------     
        // Get unique programming language entries with values from data
        
        var prog_langs_data = d3.nest()
            .key(function(d) { return d.prog_lang; })
            .rollup(function(v) { return v.length; })
            .entries(data);

        console.log(JSON.stringify(prog_langs_data));

        
        // ------ END -------



        // Config for chart
        const thickness = 50;
        const duration = 500;
        const radius = Math.min(width, height) / 2;


        // PART 2
        // ------ YOUR CODE GOES HERE -------- 
        // use color variables 
        // create ordinal scale
        // define domain()
        // define range()

        var color = d3.scaleOrdinal()
            .domain(["py", "java", "php", "cpp", "other", "js"])  
            .range(["#1b7688", "#1b7676", "#f9d057", "#f29e2e", "#9b0a0a", "#d7191c"]);
        

        // ------ END -------


        // Define arc
        const arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

        // Define arcMouseOver
        const arcMouseOver = d3.arc()
            .innerRadius(radius - thickness - 10)
            .outerRadius(radius);

        // Define pie
        const pie = d3.pie()
            .value(function (d) {
                return d.value;
            })
            .sort(null);

        // Build Pie Chart
        var path = container.selectAll('path')
            .data(pie(prog_langs_data))
            .enter()
            .append("g")
            .on("mouseover", function (d) {

                let g = d3.select(this)
                    .style("cursor", "pointer")
                    .style("fill", function(d,i) { return color(i); })
                    .append("g")
                    .attr("class", "text-group");

                g.append("text")
                    .text(`${d.data.key}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '-15px')
                    .style('font-size', '20px');

                g.append("text")
                    .text(`${d.data.value}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '25px')
                    .style('font-size', '30px');
            })
            .on("mouseout", function (d) {

                d3.select(this)
                    .style("cursor", "none")
                    .style("fill", color(this._current))
                    .select(".text-group").remove();
            })
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .on("mouseover", function (d) {
                d3.select(this)
                    .transition()
                    .duration(400)
                    .attr("d", arcMouseOver)
                    .style("cursor", "pointer")
                    .style("fill", "gray");
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .transition()
                    .duration(400)
                    .attr("d", arc)
                    .style("cursor", "none")
                    .style("fill", color(this._current));
            })
            .each(function (d, i) {
                this._current = i;
            });

    }

})();
