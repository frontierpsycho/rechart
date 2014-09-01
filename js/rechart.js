$(function() {
  'use strict';

  console.debug("All plugged in and ready to go");

  $.jqplot.config.enablePlugins = true;
 
  var plot;
  var data = [['Poor', 1],['Rich', 9]];
  var options = {
    title: 'Highlighting, Dragging, Cursor and Trend Line',
    axesDefaults: {
      min: 0,
      max: 10
    },
     axes: {
         xaxis: {
             renderer: $.jqplot.CategoryAxisRenderer,
             tickOptions: {
                 formatString: '%.2f'
             }
         },
         yaxis: {
             tickOptions: {
                 formatString: '%.2f'
             }
         }
     },
     highlighter: {
         sizeAdjust: 10,
         tooltipLocation: 'sw',
         tooltipAxes: 'both',
         tooltipFormatString: '%.2f',
         useAxesFormatters: false
     },
     cursor: {
         show: true
     },
     series: [{
       dragable: {
         constrainTo: 'y'
       }
     }]
  };

  var replot = function() {
    if (plot) {
      console.debug('Replotting:', data);
      plot.replot({ data: [data], resetAxes: false, clear: false });
    } else {
      plot = $.jqplot('chartdiv', [data], options);
    }
  };

  replot();

  var dragStopHandler = function(event, newPos, newData) { 
    var delta = newData.yaxis - data[1][1];
    console.debug('Delta:', newData, data, delta);

    data[0][1] -= delta;
    data[1][1] += delta;
    console.debug(data);

    replot();
  };

  var dragHandler = function(event, a, b, newData, newPos) {
    return dragStopHandler(event, newPos, newData);
  };

  //plot.target.on('jqplotSeriesPointChange', dragHandler);
  plot.target.on('jqplotDragStop', dragStopHandler);
  
});
