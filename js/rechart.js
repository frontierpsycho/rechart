require([
    "dojox/charting/Chart",
    "dojox/charting/axis2d/Default",
    "dojox/charting/themes/Wetland",
    "dojox/charting/plot2d/StackedColumns",
    'dojo/domReady!'
], function (
  Chart,
  Default,
  theme,
  StackedColumns
) {
  'use strict';

  var data = {
    "Poor": 5,
    "Middle class": 65,
    "Rich": 30
  };

  var refreshChart = function(chart) {
    for (var category in data) {
      if (data.hasOwnProperty(category)) {
        chart.updateSeries(category, [data[category]]);
      }
    }
    chart.render();
  };

  // Create the chart within its "holding" node
  var chart = new Chart("chartNode");
 
  // Set the theme
  chart.setTheme(theme);

  // Add the only/default plot
  chart
    .addPlot("default", {
      type: StackedColumns, // our plot2d/Pie module reference as type value
      markers: true,
      labels: true,
      labelStyle: "inside",
      hAxis: "x",
      vAxis: "y",
      enableCache: true
    })
    .addAxis("x", {
      fixLower: "major",
      fixUpper: "major"
    })
    .addAxis("y", {vertical: true, fixLower: "major", fixUpper: "major", min: 0, max: 100 });

  for (var category in data) {
    if (data.hasOwnProperty(category)) {
      chart.addSeries(category, [data[category]]);
    }
  }
  chart.render();

  var dragstart = 0;

  $("#rich").on("drag", function(event) {
    var originalEvent = event.originalEvent;
    var delta = (originalEvent.pageY - dragstart);

    // divide by chart height in pixels so that move is proportional to chart height visually
    // but also multiply by 100 because we represent 0.3 as 30%
    var normalizedDelta = delta / 6.0;

    if (data["Rich"] + normalizedDelta < 0 || data["Rich"] > 100 || originalEvent.pageY == 0) {
      // don't move point outside [0, 100], don't move at the end of dragging, when pageY is 0
      return;
    }

    var threshold = 5; // limit repaintings
    
    if(Math.abs(delta) > threshold) {
      data["Rich"] += normalizedDelta;
      data["Middle class"] -= normalizedDelta;
      dragstart = originalEvent.pageY;
      refreshChart(chart);
    }
  });

  $("#rich").on("dragstart", function(event) {
    dragstart = event.originalEvent.pageY;
    console.debug("Setting dragstart", dragstart);
  });
});

