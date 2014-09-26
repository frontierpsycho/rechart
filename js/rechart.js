require([
    "rechart/PercentageCollection",
    "dojox/charting/Chart",
    "dojox/charting/axis2d/Default",
    "dojox/charting/themes/Wetland",
    "dojox/charting/plot2d/StackedColumns",
    'dojo/domReady!'
], function (
  PercentageCollection,
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

  var collection = PercentageCollection(data);

  var refreshChart = function(chart) {
    for (var category in collection.data) {
      if (collection.data.hasOwnProperty(category)) {
        chart.updateSeries(category, [collection.data[category].value]);
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

  for (var category in collection.data) {
    if (collection.data.hasOwnProperty(category)) {
      chart.addSeries(category, [collection.data[category].value]);
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

    if (collection.data["Rich"] + normalizedDelta < 0 || collection.data["Rich"] > 100 || originalEvent.pageY == 0) {
      // don't move point outside [0, 100], don't move at the end of dragging, when pageY is 0
      return;
    }

    var threshold = 4; // limit repaintings
    
    if(Math.abs(delta) > threshold) {
      collection.modify("Rich", normalizedDelta);
      //data["Rich"] += normalizedDelta;
      //data["Middle class"] -= normalizedDelta;
      dragstart = originalEvent.pageY;
      refreshChart(chart);
    }
  });

  $("#rich").on("dragstart", function(event) {
    dragstart = event.originalEvent.pageY;
    console.debug("Setting dragstart", dragstart);
  });

  $("#lock-poor").on("change", function(event) {
    collection.data.Poor.locked = $(event.target).prop("checked");
  });
});

