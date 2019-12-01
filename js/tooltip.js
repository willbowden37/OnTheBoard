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
            // .style("background", "#FFFFFF")
            .attr('id', 'tooltip')
            .classed('tooltipDiv', true)
        ;
    };

    /**
     * Gets the HTML content for a tool tip.
     */
    tooltip_html(d) {
        // let text = "<h2 class ="  + this.chooseClass(d.State_Winner) +
        //     " >" + d.State + "</h2>";
        // text +=  "Electoral Votes: " + d.Total_EV;
        // text += "<ul>"
        // // Democrat
        // text += "<li class = democrat>" +
        //     d.D_Nominee_prop+":\t\t"+d.D_Votes+"("+d.D_Percentage+"%)" + "</li>"
        // // Republican
        // text += "<li class = republican>" +
        //     d.R_Nominee_prop+":\t\t"+d.R_Votes+"("+d.R_Percentage+"%)" + "</li>"
        // // Independent
        // if (d.I_Percentage) {
        //     text += "<li class = independent>" +
        //         d.I_Nominee_prop+":\t\t"+d.I_Votes+"("+d.I_Percentage+"%)" + "</li>"
        // }
        // text += "</ul>";

        let text = '<h2>' + d.original_title + '</h2>';
        text += '<ul>';
        text += '<li> Average Rating: ' + d.average_rating + ' </li>'
        text += '</ul>';

        return text;
    }

    mouseover(d) {
        this.tooltip
            .html(this.tooltip_html(d))
            // .classed('tooltip-title', true)
        ;
        this.tooltip.style("visibility", "visible");
    }

    mousemove() {
        this.tooltip.style("top", (d3.event.pageY-30)+"px")
            .style("left",(d3.event.pageX+10)+"px");
    }

    mouseout() {
        this.tooltip.style("visibility", "hidden");
    }

}
