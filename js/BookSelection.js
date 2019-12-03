class BookSelection {
    /**
     * Constructor
     *
     * @param bundledChart
     * @param barChart a reference to the bar chart to call its update function
     */
    constructor(bundledChart, barChart, scatterplot) {
        this.bundledChart = bundledChart;
        this.barChart = barChart;
        this.scatterplot = scatterplot;
        this.listedBooks = [];
        this.margin = { top: 20, right: 20, bottom: 30, left: 30 };
        this.divSelection = d3.select("#book-selection");
        this.divSelection.append('ul').attr('class', 'listSelection');

    }

    initializeList(books) {
        //Currently not using this list of books, might not need it at all
        // this.books = books
        // console.log(books)

        //possibly add headers to the list, include more information, option to sort the list?
    }


    update(book) {
        //This receives a book element
        // console.log(book)

        let added = false;
 
        if (this.listedBooks.some(e => e.book_id === book.book_id)) {
            //list contains book already, remove it.
            const index = this.listedBooks.findIndex(e => e.book_id === book.book_id);
            this.listedBooks = [
                ...this.listedBooks.slice(0, index),
                ...this.listedBooks.slice(index + 1)
            ]
        }
        else{
            //add book to list
            this.listedBooks.push(book)
            added = true;
        }

        //possibly sort the list?
        
        let list = this.divSelection.select('ul')
        
        list.selectAll('li').remove()

        
        list.selectAll('li')
        .data(this.listedBooks)
        .enter()
        .append('li')
        .attr('class', 'fullListItem')
        .text(d => d.original_title)
        .on('mouseover', (d,i) => {
            
        })
        .on('mouseout', d => {

        })
        .on('click', d => {
            //Possibly call an update to bundledChart here
        })
        ;


        // Updates charts
        this.barChart.update(this.listedBooks);
        this.bundledChart.update(book, added);
        this.scatterplot.update(this.listedBooks);


    }
}