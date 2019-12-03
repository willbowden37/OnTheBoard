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

        let text = '<h2>' + d.original_title + '</h2>';
        text += '<ul>';
        text += '<li> Average Rating: ' + d.average_rating + ' </li>';
        text += '<li> Total Ratings: ' + d.ratings_count + ' </li>';
        text += '</ul>';

        return text;
    }

    mouseover(d) {
        this.tooltip
            .html(this.tooltip_html(d))
        ;
        this.tooltip.style("visibility", "visible");
    }

    mousemove() {
        this.tooltip.style("top", (d3.event.pageY-50)+"px")
            .style("left",(d3.event.pageX+10)+"px");
    }

    mouseout() {
        this.tooltip.style("visibility", "hidden");
    }

}
