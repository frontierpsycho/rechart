require([
    'rechart/rechart',
    "dojox/charting/Chart",
    "dojox/charting/axis2d/Default",
    "dojox/charting/themes/Wetland",
    "dojox/charting/plot2d/StackedColumns",
    'dojo/domReady!'
], function (
  rechart,
  Chart,
  Default,
  theme,
  StackedColumns
) {
  'use strict';

  // Create the chart within it's "holding" node
  var pieChart = new Chart("chartNode");
 
  // Set the theme
  pieChart.setTheme(theme);

  // Add the only/default plot
  pieChart
    .addPlot("default", {
      type: StackedColumns, // our plot2d/Pie module reference as type value
      markers: true,
      labels: true,
      labelStyle: "inside",
      hAxis: "x",
      vAxis: "y"
    })
    .addAxis("x", {
      fixLower: "major",
      fixUpper: "major"
    })
    .addAxis("y", {vertical: true, fixLower: "major", fixUpper: "major", min: 0})
    .addSeries("January", [0.5, 1, 0.5, 1])
    .addSeries("February", [0.8, 0.3, 0.8, 0.3])
    .render();
});

