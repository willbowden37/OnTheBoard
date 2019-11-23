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
    parseData(taggedBooks,genres){
        // console.log(taggedBooks);
        // console.log(genres);
        let myData = [];
        myData.push({
            id: "Genres",
            parentId: null,
            data:null
        })

        genres.forEach(currentGenre => {
            // console.log(currentGenre)
            myData.push({
                id: currentGenre.name,
                parentId: 'Genres',
                data:null
            })

            // let myBooks = taggedBooks.filter(book => book.tags.includes(currentGenre.id))
            // console.log('Genre: ' + currentGenre.name + ' books: ', myBooks)
        });





        // taggedBooks.forEach(element => {
        //     if (element.tags.includes(genre.id))

        //     let myParentId = element.tags.filter(e => e.tags.includes(genre.id));


        

        //     myData.push({
        //         id: element.original_title,
        //         parentId:myParentId,
        //         data:element
        //     })
        // })


        //Will really need to figure out duplicate books for each genre, but
        //for now I am just using a few. 
        myData.push({
            id: "book1",
            parentId: 'Biography',
            data:null
        },{
            id: "book2",
            parentId: 'Biography',
            data:null
        },{
            id: "book3",
            parentId: 'Crime',
            data:null
        },{
            id: "book4",
            parentId: 'Crime',
            data:null
        },{
            id: "book5",
            parentId: 'Fantasy',
            data:null
        },{
            id: "book6",
            parentId: 'Fantasy',
            data:null
        },{
            id: "book7",
            parentId: 'History',
            data:null
        },{
            id: "book8",
            parentId: 'History',
            data:null
        },{
            id: "book9",
            parentId: 'Horror',
            data:null
        },{
            id: "book10",
            parentId: 'Horror',
            data:null
        },{
            id: "book11",
            parentId: 'Manga',
            data:null
        },{
            id: "book12",
            parentId: 'Manga',
            data:null
        },{
            id: "book13",
            parentId: 'Mystery',
            data:null
        },{
            id: "book14",
            parentId: 'Mystery',
            data:null
        },{
            id: "book15",
            parentId: 'Romance',
            data:null
        },{
            id: "book16",
            parentId: 'Romance',
            data:null
        },{
            id: "book17",
            parentId: 'Science Fiction',
            data:null
        },{
            id: "book18",
            parentId: 'Science Fiction',
            data:null
        },{
            id: "book19",
            parentId: 'Young Adult',
            data:null
        },{
            id: "book20",
            parentId: 'Young Adult',
            data:null
        })
        
        console.log(myData)
        return myData
    }

    initialize(bookTags, taggedBooks, tags, genres){

        this.parsedData = this.parseData(taggedBooks,genres);
        // console.log(taggedBooks)


        let diameter = 600,
            radius = diameter / 2,
            innerRadius = radius - 120;

        let cluster = d3.cluster()
            .size([360, innerRadius]);

        let line = d3.radialLine()
            .curve(d3.curveBundle.beta(0.85))
            .radius(function(d) { return d.y; })
            .angle(function(d) { return d.x / 180 * Math.PI; });

        let group = this.svg.append('g')
            .attr("transform", "translate(" + radius + "," + radius + ")")
        ;

        let link = group.append("g").selectAll(".link"),
            node = group.append("g").selectAll(".node");

        // console.log('hi')

        // Create a root for the tree using d3.stratify(); 
        let root = d3.stratify()
            .id(d => d.id)
            .parentId(d => d.parentId)
            (this.parsedData)
        ;
        // console.log(root)
        cluster(root)
        // console.log(root)


        // link = link
        //     .data(connectingReviews(root.leaves()))
        //     .enter().append("path")
        //     .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
        //     .attr("class", "link")
        //     .attr("d", line)
        // ;
        node = node
            .data(root.leaves())
            .enter().append("text")
            .attr("class", "node")
            .attr("dy", "0.31em")
            .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
            .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
            .text(function(d) { return d.id; })
        ;

    }

    // Return a list of connection reviews for the given array of nodes.
    connectingReviews(nodes) {
        // var map = {},
        //     imports = [];
    
        // // Compute a map from name to node.
        // nodes.forEach(function(d) {
        // map[d.data.name] = d;
        // });
    
        // // For each import, construct a link from the source to target node.
        // nodes.forEach(function(d) {
        // if (d.data.imports) d.data.imports.forEach(function(i) {
        //     imports.push(map[d.data.name].path(map[i]));
        // });
        // });
    
        // return imports;
    }

    update(data) {
        
    }
}