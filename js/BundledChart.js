/** 
 * BundledChart
 * Authors: Will Bowden, Joseph Turcotte, Jason Andersen
 * Data Visualization Final Project USU Fall 2019
 * 
 * 
 * this is where the functionality and display settings for the main Heirarchical Bundled Chart are.
*/
class BundledChart {
    /** 
     * Constructor
    */
    constructor() {
        this.margin = { top: 20, right: 20, bottom: 30, left: 30 };
        let divScatterplot = d3.select("#bundled-chart");

        this.svgBounds = divScatterplot.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 600;

        this.svg = divScatterplot.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .attr("id", "mainSvg")
            ;

        this.booklist = [];
        this.clonedNodes = [];

        this.booklistHover = [];
        this.clonedNodesHover = [];

        this.svg.append('text')
            .attr('class', 'barChartTitle')
            .attr('dx',50)
            .attr('dy', 20)
            .text('Edge Bundling Chart')
        ;

    }
  
    // Return a list of connection reviews for the given array of nodes.
    connectingReviews(nodes) {
        // //console.log(nodes)
        var map = {},
            links = [];
        var linked = {};
        let maxIndividualLinks = 4;

        // Compute a map from book to book.
        nodes.forEach(function (d) {
            map[d.id] = d;
        });

        //console.log('started')
        // For each import, construct a link from the source to target node.
        nodes.forEach(d => {
            linked[d.id] = true;
            // //console.log(d)
            if (d.data.connections) {
                for (let i = 0; i < d.data.connections.length && i < maxIndividualLinks; i++) {
                    let conn = d.data.connections[i];
                    if (!(conn in linked))
                        links.push(map[d.id].path(map[conn]));
                }
            }
        });
        //console.log('done')
        // //console.log(map)
        //console.log("Length of links is " + links.length)
        return links;
    }

    initialize(ratings) {

        //determine the size of the chart
        let diameter = this.svgHeight * 1.3,
            radius = diameter / 2,
            innerRadius = radius - 120;

        let cluster = d3.cluster()
            .size([360, innerRadius]);

        let line = d3.radialLine()
            .curve(d3.curveBundle.beta(0.85))
            .radius(function (d) { return d.y; })
            .angle(function (d) { return d.x / 180 * Math.PI; });

        let group = this.svg.append('g')
            .attr("transform", "translate(" + this.svgWidth / 2 + "," + this.svgHeight / 2 + ")")
            ;

        this.link = group.append("g").attr('id', 'myMainG').selectAll(".link");
        this.allNode = group.append("g").selectAll(".node");
        let text = group.append("g").selectAll(".parentText");

        // //console.log('hi')

        // Create a root for the tree using d3.stratify(); 
        let root = d3.stratify()
            .id(d => d.id)
            .parentId(d => d.parentId)
            (ratings)
            ;
        // //console.log(root)
        cluster(root)

        //console.log("root and leaves");
        //console.log(root);
        //console.log(root.leaves());
        //console.log(root.descendants());

//Display all of the connecting links
        let myLinks = this.connectingReviews(root.leaves())
        this.link = this.link
            .data(myLinks)
            .enter().append("path")
            .each(function (d) {
                ////console.log(d)
                d.source = d[0], d.target = d[d.length - 1];
            })
            .attr("class", "link")
            .attr("d", line)
            .attr("id", d => d[0].id + "-" + d[d.length - 1].id)
            ;
        //console.log("Done with links");
//Display all of the nodes representing books
        let barWidth = 10
        let barHeight = .1
        this.allNode = this.allNode
            .data(root.leaves())
            .enter().append("rect")
            .attr("class", "node")
            .attr('width', barWidth)
            .attr('height', barHeight)
            .attr('class', d => d.parentId)
            .attr("transform", function (d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)"; })
            .attr("id", d => d.data.data.book_id)
            // 
            // .text(function(d) { return d.id; })
            ;
//Display the text to identify genres

        let myGenres = root.descendants().slice(1, 11);
        text = text.data(myGenres)
            .enter()
            .append('text')
            .attr('class', 'barChartTitle')
            .attr('dx', d => d.y * 2.1 * Math.cos((d.x - 90) * Math.PI / 180))
            .attr('dy', d => d.y * 2.1 * Math.sin((d.x - 90) * Math.PI / 180))
            .text(d => d.id)
            .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })

    }


    update(book, added) {
        this.clonedNodes.forEach(node => {
            let rn = document.getElementById(node);
            if (rn) rn.remove();
        });
        if (added) {
            this.booklist.push(book);
        } else {
            let deleteIndex = -1;
            for (let i = 0; i < this.booklist.length; i++) {
                if (this.booklist[i].original_title === book.original_title) {
                    deleteIndex = i;
                }
            }
            if (deleteIndex >= 0) this.booklist.splice(deleteIndex, 1);
        }

        for (let eachLink of this.link._groups[0]) {
            let bookIds = eachLink.id.split('-');
            let book1Id = bookIds[0];
            let book2Id = bookIds[2];
            for (let eachBook of this.booklist) {
                if (eachBook.book_id === book1Id || eachBook.book_id === book2Id) {
                    eachLink.classList.add('selected');
                    let node = document.getElementById(eachLink.id);
                    let newNode = node.cloneNode(true);
                    let newId = eachLink.id + "-clone";
                    this.clonedNodes.push(newId);
                    newNode.id = newId;
                    document.querySelector("#myMainG").appendChild(newNode);
                }
            }
            if (!added) {
                if (book.book_id === book1Id || book.book_id === book2Id) {
                    if (eachLink.classList.contains('selected')) {
                        eachLink.classList.remove('selected');
                    }
                }
            }
        }
    }

    updateHover(book, added) {
        //for (let i = 0; i < this.node)
        if (added) {
            //console.log(this.allNode);
            for (let node of this.allNode._groups[0]) {
                if (book.book_id === node.id) {
                    node.classList.add("selectedHover");
                }
            }
        } else {
            for (let node of this.allNode._groups[0]) {
                if (book.book_id === node.id) {
                    node.classList.remove("selectedHover");
                }
            }
        }


    }
}