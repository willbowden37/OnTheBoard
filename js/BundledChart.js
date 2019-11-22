class BundledChart {
    constructor() {
        this.margin = { top: 20, right: 20, bottom: 30, left: 30 };
        let divScatterplot = d3.select("#bundled-chart");

        this.svgBounds = divScatterplot.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 600;

        this.svg = divScatterplot.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
        ;
    }

    update(data) {
        
    }
}