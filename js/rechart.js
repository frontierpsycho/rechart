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
    "Poor": 0.05,
    "Middle class": 0.65,
    "Rich": 0.30
  };

  var refreshChart = function(chart) {
    for (var category in data) {
      if (data.hasOwnProperty(category)) {
        chart.updateSeries(category, [data[category]]);
      }
    }
    chart.render();
  };

  // Create the chart within it's "holding" node
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
    .addAxis("y", {vertical: true, fixLower: "major", fixUpper: "major", min: 0, max: 1 });

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
    var normalizedDelta = delta / 600.0; // divide by chart height in pixels so that move is proportional to chart height visually

    console.debug("delta:", delta, "normalizedDelta:", normalizedDelta, Math.abs(delta));
    if (data["Rich"] + normalizedDelta < 0 || data["Rich"] > 1 || originalEvent.pageY == 0) {
      // don't move point too far, don't move at the end of dragging, when pageY is 0
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

