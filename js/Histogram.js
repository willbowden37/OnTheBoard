class Histogram {
    /**
     * Constructor
     * 
     * @param book a specific book to visualize
     */

    constructor() {

        this.margin = { top: 20, right: 20, bottom: 30, left: 30 };
        let divHistogram = d3.select("#histogram");

        this.svgBounds = divHistogram.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 200;

        this.svg = divHistogram.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
        ;
    }

    update(book) {
        
    }
}