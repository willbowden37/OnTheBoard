/** 
 * StackedChart
 * Authors: Joseph Turcotte
 * Data Visualization Final Project USU Fall 2019
 * 
 * 
 * This class controls the functionality of the stacked bar chart. 
*/
class StackedChart {
    /**
     * Constructor
     * 
     * @param book a specific book to visualize
     */

    constructor(tooltip) {

        this.margin = { top: 20, right: 20, bottom: 30, left: 30 };
        let divStackedChart = d3.select("#stacked-chart");

        this.svgBounds = divStackedChart.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 200;
        this.colors = ["#ff4545", "#ffa534", "#ffe234", "#b7dd29", "#57e32c"];
        this.tooltip = tooltip;

        this.svg = divStackedChart.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            ;

        this.svg.append('text')
            .attr('class', 'barChartTitle')
            .attr('dx', this.svgWidth / 2 - 30)
            .attr('dy', 20)
            .text('Stacked Chart')
            ;

        //Create the legend for the stacked bar chart
        let legend = [
                "1 Star",
                "2 Star",
                "3 Star",
                "4 Star",
                "5 Star"
        ]
        this.svg.selectAll('rect')
            .data(legend)
            .enter()
            .append('rect')
            .attr('class', 'stackedBarChartLegendRect')
            .attr('fill', (d, i) => this.colors[i])
            .attr("y", 25)
            .attr('height', 25)
            .attr("x", (d, i) => i*60 +2)
            .attr("width", d => 60)
        ;

        this.svg.selectAll('text .barChartLegend')
            .data(legend)
            .enter()
            .append('text')
            .attr('class', 'barChartLegend')
            .attr('dx', (d,i) => i*60 +15)
            .attr('dy',40)
            .text(d => d)
        ;


        this.overG;
    }

    createScale(total) {
        //console.log(total);
        return d3.scaleLinear()
            .rangeRound([0, this.svgWidth])
            .domain([0, total])
            .nice();
    }

    update(bookList) {
        d3.select('#parentG').remove();
        let overG = this.svg.append('g')
            .attr('id', 'parentG')
            .attr('transform', `translate(0, 25)`)
            ;

        let barHeight = 25;
        this.svg.attr("height", bookList.length * barHeight + 60);
        let myData = [];
        bookList.forEach(book => {
            let total = parseInt(book.ratings_1) + parseInt(book.ratings_2) + parseInt(book.ratings_3) + parseInt(book.ratings_4) + parseInt(book.ratings_5);
            let xScale = this.createScale(total);
            let first = 0;
            let second = xScale(parseInt(book.ratings_1));
            let ratings = [
                {
                    nums: parseInt(book.ratings_1), coords: [], average_rating: book.average_rating,
                    original_title: book.original_title,
                    total_ratings: total, book_id: book.book_id
                },
                {
                    nums: parseInt(book.ratings_2), coords: [], average_rating: book.average_rating,
                    original_title: book.original_title,
                    total_ratings: total, book_id: book.book_id
                },
                {
                    nums: parseInt(book.ratings_3), coords: [], average_rating: book.average_rating,
                    original_title: book.original_title,
                    total_ratings: total, book_id: book.book_id
                },
                {
                    nums: parseInt(book.ratings_4), coords: [], average_rating: book.average_rating,
                    original_title: book.original_title,
                    total_ratings: total, book_id: book.book_id
                },
                {
                    nums: parseInt(book.ratings_5), coords: [], average_rating: book.average_rating,
                    original_title: book.original_title,
                    total_ratings: total, book_id: book.book_id
                }
            ];
            ratings[0].coords.push(first, second);
            for (let i = 1; i < ratings.length; i++) {
                first = second;
                second += i == ratings.length - 1 ? xScale(total) : xScale(ratings[i].nums)
                ratings[i].coords.push(first, second);
            }

            let avg = Math.floor(parseInt(book.average_rating));
            let avgF = ratings[avg - 1].coords;
            let remainder = parseFloat(book.average_rating) - avg;
            let inbetween = (avgF[1] - avgF[0]) * remainder;
            let avgX = inbetween + avgF[0];
            myData.push({
                xScale: xScale,
                average_rating: book.average_rating,
                original_title: book.original_title,
                total_ratings: total,
                averageCoords: avgX,
                ratings: [...ratings]
            });
        })

        // console.log(myData);

        let eachG = overG.selectAll("g")
            .data(myData)
            ;
        let subG = eachG.enter()
            .append('g')
            .attr('transform', (d, i) => `translate(0, ${i * barHeight + 30})`)
            ;

        subG.selectAll('rect')
            .data(function (d) { return d.ratings })
            .enter()
            .append('rect')
            .attr('fill', (d, i) => this.colors[i])
            .attr("y", 0)
            .attr('height', 25)
            .attr("x", d => d.coords[0])
            .attr("width", d => d.coords[1] - d.coords[0])
            .attr("stroke", "white")
            .attr("stroke-width", 0.5)
            .on('mouseover', (d, i) => {
                let text = `<p>Number of ${i + 1} star reviews: ${d.nums}</p><p>Total Number of ratings: ${d.total_ratings}</p>`;
                return this.tooltip.mouseover(d, text);
            })
            .on('mousemove', () => {
                return this.tooltip.mousemove();
            })
            .on('mouseout', (d) => {
                return this.tooltip.mouseout(d);
            })
            ;

        subG.append("line")
            .attr("x1", d => d.averageCoords)
            .attr("y1", 0)
            .attr("x2", d => d.averageCoords)
            .attr("y2", 25)
            .style("stroke", "black")
            ;
        console.log(myData)
        subG.selectAll('text')
            .data(function (d) { return [d.original_title] })
            .enter()
            .append('text')
            .attr('y', 17)
            // .attr('transform', function () {
            //     index++;
            //     let dx = xPos[index - 2];
            //     let dy = localSvgHeight - 15;
            //     return 'translate(' + dx + ',' + dy + ') rotate(-65)';
            // })
            .text(d => {
                console.log(d)
                return d
            })
            .style('font-size', 8)
        ;

    }
}