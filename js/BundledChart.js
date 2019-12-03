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
    parseData(taggedBooks,genres, ratings){
        console.log(taggedBooks);
        console.log(genres);
        console.log(ratings);
        let myData = [];
        myData.push({
            id: "Genres",
            parentId: null
        })

        genres.forEach(currentGenre => {
            // console.log(currentGenre)
            myData.push({
                id: currentGenre.name,
                parentId: 'Genres'
            })

            // let myBooks = taggedBooks.filter(book => book.tags.includes(currentGenre.id))
            // console.log('Genre: ' + currentGenre.name + ' books: ', myBooks)
        });



        // var genreIds = $.map(genres, function(value, key) { return value });
        // console.log(genreIds)
        taggedBooks.forEach(book => {

            let myConnections = [];
            // ratings.forEach(rating => {
            //     if(rating.book_id === book.book_id){
            //         let userID = rating.user_id;
            //         let booksToConnect = ratings.filter(e => e.user_id === userID && e.book_id !== book.book_id)
            //         myConnections = myConnections.concat(booksToConnect)
            //     }
            // })
            
            let myParentIds = []
            genres.forEach(currentGenre => {
                if(book.tags.includes(currentGenre.id)){
                    myParentIds.push(currentGenre.name)
                }
            })


            //Assign unique ID for each book
        
            let i = 10
            myParentIds.forEach(parentId => {
                let uniqueBookId = book.book_id.concat('-'+i.toString(36))
                myData.push({
                    id: uniqueBookId,
                    parentId:parentId,
                    data:book,
                    connections:myConnections
                })
                i++
            })
        })
 
        console.log(myData)
        return myData
    }
    // Return a list of connection reviews for the given array of nodes.
    connectingReviews(nodes) {
        // console.log(nodes)
        var map = {},
            links = [];
        let maxIndividualLinks = 2;
    
        // Compute a map from book to book.
        nodes.forEach(function(d) {
            map[d.id] = d;
        });
    
        console.log('started')
        // For each import, construct a link from the source to target node.
        nodes.forEach(d => {
            // console.log(d)
            if (d.data.connections) {
                for (let i = 0; i < d.data.connections.length && i < maxIndividualLinks; i++) {
                    let conn = d.data.connections[i];
                    links.push(map[d.id].path(map[conn]));
                }
            }
        });
        console.log('done')
        // console.log(map)
        // console.log(links)
        return links;
    }

    initialize(ratings){

        let diameter = this.svgHeight * 1.3,
            radius = diameter / 2,
            innerRadius = radius - 120;

        let cluster = d3.cluster()
            .size([360, innerRadius]);

        let line = d3.radialLine()
            .curve(d3.curveBundle.beta(0.85))
            .radius(function(d) { return d.y; })
            .angle(function(d) { return d.x / 180 * Math.PI; });

        let group = this.svg.append('g')
            .attr("transform", "translate(" + radius * 1.5 + "," + radius * 0.75 + ")")
        ;

        let link = group.append("g").selectAll(".link"),
            node = group.append("g").selectAll(".node");

        // console.log('hi')

        // Create a root for the tree using d3.stratify(); 
        let root = d3.stratify()
            .id(d => d.id)
            .parentId(d => d.parentId)
            (ratings)
        ;
        // console.log(root)
        cluster(root)

        console.log("root and leaves");
        console.log(root);
        console.log(root.leaves());
        let myLinks = this.connectingReviews(root.leaves())
        console.log(myLinks)
        link = link
            .data(myLinks)
            .enter().append("path")
            .each(function(d) { 
                //console.log(d)
                d.source = d[0], d.target = d[d.length - 1]; 
            })
            .attr("class", "link")
            .attr("d", line)
        ;
        console.log("Done with links");

        let barWidth = 10
        let barHeight = .1
        node = node
            .data(root.leaves())
            .enter().append("rect")
            .attr("class", "node")
            .attr('width', barWidth)
            .attr('height', barHeight)
            .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)"; })
            // .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
            // .text(function(d) { return d.id; })
        ;

    }


    update(data) {
        
    }
}