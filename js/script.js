/** 
 * main script
 * Authors: Will Bowden, Joseph Turcotte, Jason Andersen
 * Data Visualization Final Project USU Fall 2019
 * 
 * this is the main script called from index.html, it reads in the csv files
 * and instantiates the necessary classes and calls their init functions.
*/
let bundledChart = new BundledChart();

let tooltip = new Tooltip(bundledChart);

let barChart = new Barchart(tooltip);
let scatterplot = new Scatterplot(tooltip);
let stackedChart = new StackedChart(tooltip);

let bookSelection = new BookSelection(bundledChart, barChart, scatterplot, stackedChart);

let search = new SearchBox(bundledChart, bookSelection);

//Load the csv files cooresponding to the books
Promise.all([
  d3.csv("data/book_tags.csv"),
  d3.csv("data/books.csv"),
  d3.csv("data/tags.csv"),
  d3.json("data/bestRatingsYet.json"),
  d3.json("data/genres.json")
]).then(function (files) {
  let bookTags = files[0];
  let books = files[1];
  let tags = files[2];
  let ratings = files[3];
  let genres = files[4];

  //Data preprocessing
  parseTags(bookTags, books, tags, genres, ratings);
})

function parseTags(bookTags, books, tags, genres,ratings) {
  //search through all of the books in the books.csv and find all of them
  // with tags that coorespond to our selected genres.
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



  //call necessary init functions for the different classes. 
  search.initialize(bookTags, taggedBooks, tags, genres)
  bundledChart.initialize(ratings)
}