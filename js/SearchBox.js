class SearchBox {
    /**
     * Constructor
     * 
     * @param bundledChart
     * @param bookSelection
     */
    constructor(bundledChart, bookSelection) {
        this.bundledChart = bundledChart;
        this.bookSelection = bookSelection;
        this.margin = { top: 20, right: 20, bottom: 30, left: 30 };
        let divSearch = d3.select("#search");

        this.svgBounds = divSearch.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 200;

        this.svg = divSearch.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
        ;
    }


    initialize(bookTags, books, tags, genres) {

        this.bookTags = bookTags
        this.books = books
        this.tags = tags
        this.genres = genres


        // d3.select('#search').selectAll('svg').append('svg');

        // d3.select('#search')
        //     .attr('width', 25);

        // d3.select("#search")
        //     .append('svg')
        //     .attr('width', 50)
        //     .attr('height', 50)
        //     .append('g')
        //     .attr("transform", "translate(10,18)")
        //     .call(goalAxis)
        // ;

    }



    update(data) {
        
    }
}