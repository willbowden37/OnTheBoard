class BookSelection {
    constructor(bundledChart) {
        this.bundledChart = bundledChart;
        this.listedBooks = []
        d3.select('#book-selection').append('ul')

    }

    initializeList(books) {
        //Currently not using this list of books, might not need it at all
        this.books = books
        console.log(books)

        //possibly add headers to the list, include more information, option to sort the list?
    }


    update(book) {
        //This receives a book element
        console.log(book)

 
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
        }

        //possibly sort the list?

        
        let list = d3.select('#book-selection').select('ul')
        
        list.selectAll('li').remove()

        
        list.selectAll('li')
        .data(this.listedBooks)
        .enter()
        .append('li')
        .text(d => d.original_title)
        .on('mouseover', (d,i) => {
            
        })
        .on('mouseout', d => {

        })
        .on('click', d => {
            //Possibly call an update to bundledChart here
        })
        ;


        
    }
}