window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        zoomEnabled: true,
        theme: "dark2",
        title:{
            text: "Growth in Internet Users Globally"
        },
        axisX:{
            title: "Jour",
            valueFormatString: "####",
            interval: 2
        },
        axisY:{
            logarithmic: true, //change it to false
            title: "Temp",
            titleFontColor: "#6D78AD",
            lineColor: "#6D78AD",
            gridThickness: 0,
            lineThickness: 1,
            includeZero: false,
            labelFormatter: addSymbols
        },
        legend:{
            verticalAlign: "top",
            fontSize: 16,
            dockInsidePlotArea: true
        },
        data: [{
            type: "line",
            xValueFormatString: "####",
            showInLegend: true,
            name: "Log Scale",
            dataPoints: [
                { x: 1994, y: 25437639 },
                { x: 1995, y: 44866595 },
                { x: 1996, y: 77583866 },
                { x: 1997, y: 120992212 },
                { x: 1998, y: 188507628 },
                { x: 1999, y: 281537652 },
                { x: 2000, y: 414794957 },
                { x: 2001, y: 502292245 },
                { x: 2002, y: 665065014 },
                { x: 2003, y: 781435983 },
                { x: 2004, y: 913327771 },
                { x: 2005, y: 1030101289 },
                { x: 2006, y: 1162916818 },
                { x: 2007, y: 1373226988 },
                { x: 2008, y: 1575067520 },
                { x: 2009, y: 1766403814 },
                { x: 2010, y: 2023202974 },
                { x: 2011, y: 2231957359 },
                { x: 2012, y: 2494736248 },
                { x: 2013, y: 2728428107 },
                { x: 2014, y: 2956385569 },
                { x: 2015, y: 3185996155 },
                { x: 2016, y: 3424971237 }
            ]
        },]
    });
    chart.render();

    function addSymbols(e){
        var suffixes = ["", "K", "M", "B"];

        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
            order = suffixes.length - 1;

        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }

}