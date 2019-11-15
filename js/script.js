// let tooltip = new Tooltip();

// let votePercentageChart = new VotePercentageChart(tooltip);

// let tileChart = new TileChart(tooltip);

// let shiftChart = new ShiftChart();

// let electoralVoteChart = new ElectoralVoteChart(shiftChart);

let bundledChart = new BundledChart();

let bookSelection = new BookSelection(bundledChart);

let search = new SearchBox(bundledChart, bookSelection);


// Load the data corresponding to all the election years.
// Pass this data and instances of all the charts that update on year
// selection to yearChart's constructor.


Promise.all([
  d3.csv("data/book_tags.csv"),
  d3.csv("data/books.csv"),
  d3.csv("data/tags.csv"),
  // d3.csv("data/to_read.csv"),
]).then(function(files) {
  // files[0] will contain file1.csv
  // files[1] will contain file2.csv
  let bookTags = files[0]
  let books = files[1]
  let tags = files[2]
  console.log('bookTags: ', bookTags)
  console.log('books: ', books)
  console.log('tags: ', tags)


  //Data preprocessing


  //Call update to

})