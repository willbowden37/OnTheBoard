class Scatterplot {
    /**
     * Constructor
     * 
     * @param book a specific book to visualize
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
    }

    update(books) {
        console.log(books);
    }
}