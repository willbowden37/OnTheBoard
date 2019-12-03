class Tooltip {

    constructor(bundledChart) {
        //----------------------------------------
        // tooltip
        //----------------------------------------
        this.tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            // .style("background", "#FFFFFF")
            .attr('id', 'tooltip')
            .classed('tooltipDiv', true)
        ;

        this.bundledChart = bundledChart;
    };

    /**
     * Gets the HTML content for a tool tip.
     */
    tooltip_html(d, t) {

        let text = '<h4>' + d.original_title + '</h4>';
        text += '<p> Average Rating: ' + d.average_rating + ' </p>'
        if(d.ratings_count != null) text += '<p> Total Ratings: ' + d.ratings_count + ' </p>'

        if (t != null && t)
            text += t;

        return text;
    }

    mouseover(d, t) {
        this.tooltip
            .html(this.tooltip_html(d, t))
        ;
        this.tooltip.style("visibility", "visible");
        this.bundledChart.updateHover(d, true);
    }

    mousemove() {
        this.tooltip.style("top", (d3.event.pageY-this.tooltip.node().getBoundingClientRect().height)+"px")
            .style("left",(d3.event.pageX+10)+"px");
    }

    mouseout(d) {
        this.tooltip.style("visibility", "hidden");
        this.bundledChart.updateHover(d, false);
    }

}
