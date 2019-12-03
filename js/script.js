
let tooltip = new Tooltip();

let bundledChart = new BundledChart();

let barChart = new Barchart(tooltip);
let stackedChart = new StackedChart(tooltip);

let bookSelection = new BookSelection(bundledChart, barChart, stackedChart);

let search = new SearchBox(bundledChart, bookSelection);

let scatterplot = new Scatterplot();

// Load the data corresponding to all the election years.
// Pass this data and instances of all the charts that update on year
// selection to yearChart's constructor.


Promise.all([
  d3.csv("data/book_tags.csv"),
  d3.csv("data/books.csv"),
  d3.csv("data/tags.csv"),
  d3.json("data/bestRatingsYet.json"),
  d3.json("data/genres.json")
  // d3.csv("data/to_read.csv"),
]).then(function (files) {
  // files[0] will contain file1.csv
  // files[1] will contain file2.csv
  let bookTags = files[0];
  let books = files[1];
  let tags = files[2];
  let ratings = files[3];
  let genres = files[4];

  //Data preprocessing
  parseTags(bookTags, books, tags, genres, ratings);

  //Call update to

})

function parseTags(bookTags, books, tags, genres,ratings) {
  for (let i = 0; i < bookTags.length; i++) {
    let tag = bookTags[i];
    let id = parseInt(tag.goodreads_book_id);

    if (isNaN(id)) console.log(`id ${id} with tag ${tag.tag_id} at index ${i} failed to parse`);

    if (id > 10000) break;
    if (books[id - 1].book_id == id) {
      if (books[id - 1].tags) {
        books[id - 1].tags.push(tag.tag_id);
      } else {
        books[id - 1].tags = [];
        books[id - 1].tags.push(tag.tag_id);
      }
    } else {
      throw "May not have designed this right";
    }
  }

  let total = 0;
  let taggedBooks = [];
  for (let i = 0; i < books.length; i++) {
    if (Array.isArray(books[i].tags)) {
      let hasTag = false;
      genres.forEach(genre => {
        if (books[i].tags.includes(genre.id)) {
          genre.count++;
          hasTag = true;
        }
      })
      if (hasTag) {
        taggedBooks.push(JSON.parse(JSON.stringify(books[i])));
        // if (books[i].goodreads_book_id === "13891") console.log("Let the dragon ride again on the winds of time"); // Winter's Heart
      } else {
        total++
      }
    }
  }

  // console.log("Tagged Books", taggedBooks);
  // console.log("Genre Count", genres);
  // console.log("For loop finished", total);




  bookSelection.initializeList(taggedBooks)
  search.initialize(bookTags, taggedBooks, tags, genres)
  bundledChart.initialize(ratings)
}