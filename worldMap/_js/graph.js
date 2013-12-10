$(document).ready( function()
{
	console.log('here');
//Load file helper function
drawlinegraph(d){
  console.log(d);
  var code = d['CountryCode'];
  
  d3.loadData = function() {
  console.log('here, bitch');
      var loadedCallback = null;
      var toload = {};
      var data = {};
      var loaded = function(name, d) {
        delete toload[name];
        data[name] = d;
        return notifyIfAll();
      };
      var notifyIfAll = function() {
        if ((loadedCallback != null) && d3.keys(toload).length === 0) {
          loadedCallback(data);
        }
      };
      var loader = {
        json: function(name, url) {
          toload[name] = url;
          d3.json(url, function(d) {
            return loaded(name, d);
          });
          return loader;
        },
        csv: function(name, url) {
          toload[name] = url;
          d3.csv(url, function(d) {
            return loaded(name, d);
          });
          return loader;
        },
        onload: function(callback) {
          loadedCallback = callback;
          notifyIfAll();
        }
      };
      return loader;
    };

    
    d3.loadData()
       //console.log('here, bitch')
      .csv('growth', 'world-gdp-growth.csv')
      .csv('mobile', 'exports.csv')
      .csv('bband', 'imports.csv')
      .onload(function(data) {
        console.log("Loading mobile data");
        console.log(data.mobile);
        console.log("Loading growth data");
        console.log(data.growth);

        
        var seriesData = [ [], [],[] ];

          for (var i = 0; i <= data.growth.length - 1; i++) 
        {
          for (var j = 2005; j<=2011; j++)
      {
      if(data.growth[i]["Country Code"] == "JPN")
      seriesData[1].push({'x':j,'y':parseFloat(parseFloat(data.growth[i][j]).toFixed(2))});  
      };
    };


        for (var i = 0; i <= data.mobile.length - 1; i++) 
        {
          for (var j = 2005; j<=2011; j++)
      {
      if(data.mobile[i]["Country Code"] == "JPN")
      //seriesData[0].push({'x':j,'y':Math.log(parseFloat(data.mobile[i][j]).toFixed(2))});
      seriesData[0].push({'x':j,'y':parseFloat(parseFloat(data.mobile[i][j]).toFixed(2))});   
      
      };
    };

    //console.log(seriesData)

    for (var i = 0; i <= data.bband.length - 1; i++) 
        {
          for (var j = 2005; j<=2011; j++)
      {
      if(data.bband[i]["Country Code"] == "JPN")
      seriesData[2].push({'x':j,'y':parseFloat(parseFloat(data.bband[i][j]).toFixed(2))}); 
      };
    };

    console.log(seriesData);

    // instantiate our graph!
    a = [{'x':10,'y':20}];

var graph = new Rickshaw.Graph( {
  element: document.getElementById("chart"),
  width: 960,
  height: 500,
  renderer: 'line',
  min:'auto',
  series: [
    {
      color: "#c05020",
      data: seriesData[0],
      name: 'Exports % of GDP'
    }, {
      color: "#30c020",
      data: seriesData[1],
      name: 'GDP Growth Percentage'
    },{
      color: "#3333c0",
      data: seriesData[2],
      name: 'Imports % of GDP'
    },

  ]
} );

graph.render();

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
  graph: graph
} );

var legend = new Rickshaw.Graph.Legend( {
  graph: graph,
  element: document.getElementById('legend')

} );

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
  graph: graph,
  legend: legend
} );

var axes = new Rickshaw.Graph.Axis.X( {
  graph: graph
} );
axes.render();


var yaxes = new Rickshaw.Graph.Axis.Y( {
  graph: graph
} );
yaxes.render();   
          

}

      		
      	
});