$(function() {
  'use strict';

  console.debug("All plugged in and ready to go");

  $.jqplot.config.enablePlugins = true;
 
  var plot;
  var data = [[1], [9]];
  var options = {
    title: 'Inequality',
    stackSeries: true,
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
    seriesDefaults:{
      renderer:$.jqplot.BarRenderer,
      rendererOptions: {
        highlightMouseDown: true
      },
      pointLabels: {show: true}
    },
    legend: {
      show: true,
      location: 'e',
      placement: 'outside'
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
      plot.replot({ data: data, resetAxes: false });
    } else {
      plot = $.jqplot('chartdiv', data, options);
    }
  };

  replot();

  var dragStopHandler = function(event, newPos, newData) { 
    var delta = (newData.yaxis - data[0][0]);
    console.debug('Delta:', delta);

    data[0][0] += delta;
    data[1][0] -= delta;

    replot();
  };

  var dragHandler = function(event, a, b, newData, newPos) {
    return dragStopHandler(event, newPos, newData);
  };

  //plot.target.on('jqplotSeriesPointChange', dragHandler);
  plot.target.on('jqplotDragStop', dragStopHandler);
  
});
