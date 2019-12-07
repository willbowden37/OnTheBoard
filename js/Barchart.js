class Barchart {
    /**
     * Constructor
     * 
     * @param tooltip tooltip used to display info on books selected
     */

    constructor(tooltip) {

        this.tooltip = tooltip;

        this.margin = { top: 20, right: 20, bottom: 30, left: 30 };
        let divBarchart = d3.select("#bar-chart");

        this.svgBounds = divBarchart.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width;
        this.svgHeight = 200;

        this.svg = divBarchart.append('svg')
            .attr('width', this.svgWidth)
            .attr('height', this.svgHeight)
        ;

        this.svg.append('text')
            .attr('class', 'barChartTitle')
            .attr('dx',this.svgWidth/2 - 50)
            .attr('dy', 20)
            .text('Bar Chart')
        ;

        this.setScales();
    }

    setScales() {
        this.domain = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
        this.heightRange = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        let colorRange = ["#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15", "#860308"];
        this.heightScale = d3.scaleQuantile()
            .domain(this.domain)
            .range(this.heightRange);
        this.colorScale = d3.scaleQuantile()
            .domain(this.domain)
            .range(colorRange);
    }

    updateScales(booklist) {

    }

    update(bookList) {

        this.svg.selectAll('g').remove();

        this.setScales(bookList);

        let group = this.svg.append('g')
            .attr('height', this.svgHeight)
            .attr('width', this.svgWidth)
            .attr('class', 'bar-container')
        ;

        let barWidth = this.svgWidth / (bookList.length*2);
        let xPos = [bookList.length];
        xPos[0] = barWidth/2;
        let index = 1;
        let tooltip = this.tooltip;

        group.selectAll('rect')
            .data(bookList)
            .enter()
            .append('rect')
            .attr('x', () => {
                xPos[index] = xPos[index - 1] + barWidth*2;
                index++;
                return xPos[index-2];
            })
            .attr('y', d => this.svgHeight - this.heightScale(d.average_rating) - 50)
            .attr('width', barWidth)
            .attr('height', d => this.heightScale(d.average_rating))
            .style('fill', d => this.colorScale(d.average_rating))
            .on('mouseover', function(d) {
                return tooltip.mouseover(d);
            })
            .on('mousemove', () => {
                return this.tooltip.mousemove();
            })
            .on('mouseout', function(d) {
            return tooltip.mouseout(d);
            })
        ;

        let axisRange = this.heightRange.reverse();
        let axisScale = d3.scaleQuantile()
            .domain(this.domain)
            .range(axisRange)
        ;
        let yAxisD3 = d3.axisLeft(axisScale);
        let yAxis = this.svg.append('g');
        yAxis.attr('transform', `translate(${45}, ${47.5})`)
            .call(yAxisD3);

        this.svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x",0 - (this.svgHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Average Rating");
    }
}