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
        this.svgHeight = 600;

        divSearch.append('input')
        
        ;
        this.list = divSearch.append('ul')

        this.svg = divSearch.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
        ;

        this.svg.append('g')
            .append('rect')
            .attr('height',20)
            .attr('width',20)
            .attr('x',50)
            .attr('y',50)
            .on('click',() => {
                let text = divSearch.select('input').node().value
                this.search(text)
            })
        ;







    }


    initialize(bookTags, books, tags, genres) {

        this.bookTags = bookTags
        this.books = books
        this.tags = tags
        this.genres = genres



    }



    search(text){
        const found = this.books.filter(element => element.original_title.toLowerCase().includes(text.toLowerCase()));
        console.log(found)
        this.list.selectAll('li').remove()

        this.list.selectAll('li')
            .data(found.original_title)
            .enter()
            .append('li')
            .text(d=>d)
        ;
        
    }
}