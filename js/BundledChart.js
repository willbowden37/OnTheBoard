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


        let root = d3.stratify()([
            {id: "root"},
            {id: "Biography", parentId: "root"},
            {id: "Crime", parentId: "root"},
            {id: "Fantasy", parentId: "root"},
            {id: "History", parentId: "root"},
            {id: "Horror", parentId: "root"},
            {id: "Manga", parentId: "root"},
            {id: "Mystery", parentId: "root"},
            
            {id: "1", parentId: "Biography"},
            {id: "2", parentId: "Biography"},

            {id: "3", parentId: "Crime"},
            {id: "4", parentId: "Crime"},

            {id: "5", parentId: "Fantasy"},
            {id: "6", parentId: "Fantasy"},

            {id: "7", parentId: "History"},
            {id: "8", parentId: "History"},

            {id: "9", parentId: "Horror"},
            {id: "10", parentId: "Horror"},

            {id: "11", parentId: "Manga"},
            {id: "12", parentId: "Manga"},

            {id: "13", parentId: "Mystery"},
            {id: "14a", parentId: "Mystery"},

            {id: "14b", parentId: "Manga"},
          ]);

          console.log(root.leaves());
          const svg = d3.create("svg")
          .attr("viewBox", [-this.svgWidth / 2, -this.svgWidth / 2, this.svgWidth, this.svgWidth]);
        
        // const node = this.svg.append("g")
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", 10)
        //     .selectAll("g")
        //     .data(root.leaves())
        //     .join("g")
        //     .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
        //     .append("text")
        //     .attr("dy", "0.31em")
        //     .attr("x", d => d.x < Math.PI ? 6 : -6)
        //     .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
        //     .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
        //     .text(d => d.id)
        //     .each(function(d) { d.text = this; })
        //     ;
        //     .call(text => text.append("title").text(d => `${id(d)}
        // ${d.outgoing.length} outgoing
        // ${d.incoming.length} incoming`));
        // var line = d3.radialLine()
        //     .curve(d3.curveBundle.beta(0.85))
        //     .radius(function(d) { return d.y; })
        //     .angle(function(d) { return d.x / 180 * Math.PI; })
        // ;

        // const link = svg.append("g")
        //     .attr("stroke", 'blue')
        //     .attr("fill", "none")
        //     .selectAll("path")
        //     .data(root.leaves().flatMap(leaf => leaf.outgoing))
        //     .join("path")
        //     .style("mix-blend-mode", "multiply")
        //     .attr("d", ([i, o]) => line(i.path(o)))
        //     .each(function(d) { d.path = this; });

    }

    update(data) {
        
    }
}