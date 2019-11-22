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
        let divSearch = d3.select(".searchButton");
        divSearch.on('click', (e) => {
            let text = d3.select('.searchInput').node().value;
            this.search(text);
        });
    }


    initialize(bookTags, books, tags, genres) {

        this.bookTags = bookTags
        this.books = books
        this.tags = tags
        this.genres = genres



    }



    search(text){
        const found = this.books.filter(element => element.original_title.toLowerCase().includes(text.toLowerCase()));
        console.log(found);
        let resultList = d3.select(".searchResultsList");
        resultList.selectAll('li').remove()

        resultList.selectAll('li')
            .data(found)
            .enter()
            .append('li')
            .text(d=>d.original_title)
        ;
        
    }
}

/*

*/