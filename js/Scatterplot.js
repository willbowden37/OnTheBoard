/** 
 * Scatterplot
 * Authors: Will Bowden
 * Data Visualization Final Project USU Fall 2019
 * 
 * 
 * This class controls the functionality of the scatterplot. 
*/
class Scatterplot {
    /**
     * Constructor
     * 
     * @param tooltip a tooltip used to display more information
     */

    constructor(tooltip) {

        this.margin = { top: 20, right: 20, bottom: 30, left: 30 };
        let divScatterplot = d3.select("#scatterplot");

        this.svgBounds = divScatterplot.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 200;

        this.svg = divScatterplot.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
        ;

        this.tooltip = tooltip;

        this.svg.append('text')
            .attr('class', 'scatterplotTitle')
            .attr('dx',this.svgWidth/2 - 50)
            .attr('dy', 20)
            .text('Scatterplot')
        ;

        this.setScales();
    }

    setScales() {
        this.domain = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
        this.heightRange = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
        let colorRange = ["#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15", "#860308"];
        this.heightScale = d3.scaleQuantile()
            .domain(this.domain)
            .range(this.heightRange);
        this.colorScale = d3.scaleQuantile()
            .domain(this.domain)
            .range(colorRange);
        this.bandSize = this.svgWidth- 40;
    }

    update(books) {
        this.svg.selectAll('g').remove();

        let axisRange = this.heightRange;
        let yAxisScale = d3.scaleQuantile()
            .domain(this.domain)
            .range(axisRange)
        ;
        let yAxisD3 = d3.axisLeft(yAxisScale);
        let yAxis = this.svg.append('g');
        yAxis.attr('transform', `translate(${45}, ${47.5})`)
            .call(yAxisD3);

        this.svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0)
            .attr('x',0 - (this.svgHeight / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Average Rating')
        ;

        books = books.sort(function (a, b) {
            return a.ratings_count - b.ratings_count;
        });

        let xAxisScale = d3.scaleBand()
            .domain(books.map(d => d.ratings_count))
            .range([0, this.bandSize])
        ;
        let xAxisD3 = d3.axisBottom(xAxisScale);
        let xAxis = this.svg.append('g');
        xAxis.attr('transform', `translate(${50}, ${147.5})`)
            .call(xAxisD3);

        this.svg.append('text')
            .attr('y', this.svgHeight - 5)
            .attr('x', this.svgWidth/2)
            .text('Total Reviews')
        ;

        let chartGroup = this.svg.append('g');

        chartGroup.selectAll('circle')
            .data(books)
            .enter()
            .append('circle')
            .attr('cx', d => 50 + (this.bandSize/books.length)/2 + xAxisScale(d.ratings_count))
            .attr('cy', d => 55 + yAxisScale(d.average_rating))
            .style('fill', d => this.colorScale(d.average_rating))
            .attr('r', 5)
            .on('mouseover', d => {
                return this.tooltip.mouseover(d);
            })
            .on('mousemove', () => {
                return this.tooltip.mousemove();
            })
            .on('mouseout', (d) => {
                return this.tooltip.mouseout(d);
            })
        ;

    }
}