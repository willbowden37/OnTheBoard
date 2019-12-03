class Tooltip {

    constructor() {
        //----------------------------------------
        // tooltip
        //----------------------------------------
        this.tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .attr('id', 'tooltip')
            .classed('tooltipDiv', true)
        ;
    };

    /**
     * Gets the HTML content for a tool tip.
     */
    tooltip_html(d) {

        let text = '<h4>' + d.original_title + '</h4>';
        text += '<p> Average Rating: ' + d.average_rating + ' </p>'
        text += '<p> Total Rating: ' + d.ratings_count + ' </p>'

        if (t)
            text += t;

        return text;
    }

    mouseover(d, t) {
        this.tooltip
            .html(this.tooltip_html(d, t))
        ;
        this.tooltip.style("visibility", "visible");
    }

    mousemove() {
        this.tooltip.style("top", (d3.event.pageY-this.tooltip.node().getBoundingClientRect().height)+"px")
            .style("left",(d3.event.pageX+10)+"px");
    }

    mouseout() {
        this.tooltip.style("visibility", "hidden");
    }

}
