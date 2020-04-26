document.addEventListener("DOMContentLoaded", function(event) {
	console.log('init map')

	// Defining the RD New proects
	const projectionExtent = [
	  -285401.92,
	  22598.08,
	  595401.9199999999,
	  903401.9199999999
	];
	const projection = new ol.proj.Projection({
	  code: "EPSG:28992",
	  units: "m",
	  extent: projectionExtent
	});

	// Resoluties (pixels per meter) van de zoomniveaus:
	const resolutions = [
	  3440.64,
	  1720.32,
	  860.16,
	  430.08,
	  215.04,
	  107.52,
	  53.76,
	  26.88,
	  13.44,
	  6.72,
	  3.36,
	  1.68,
	  0.84,
	  0.42,
	  0.21
	];

	// let size = olExtent.getWidth(projectionExtent) / 256;

	// Er zijn 15 (0 tot 14) zoomniveaus beschikbaar van de WMTS-service voor de BRT-Achtergrondkaart:
	let matrixIds = new Array(15);
	for (var z = 0; z < 15; ++z) {
	  matrixIds[z] = "EPSG:28992:" + z;
	}


    let bagWMTS = new ol.layer.Tile({
      opacity: 0.7,
      source: new ol.source.WMTS({
        // attributions:
        //   'Kaartgegevens: &copy; <a href="https://www.kadaster.nl">Kadaster</a>',
        url: "https://geodata.nationaalgeoregister.nl/tiles/service/wmts?",
        layer: 'bag',
        matrixSet: "EPSG:28992",
        format: "image/png",
        projection: projection,

        tileGrid: new ol.tilegrid.WMTS({
          origin: ol.extent.getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds
        }),
        style: "default",
        wrapX: false
      })
    });

	let view = new ol.View({
		minZoom: 3,
      	maxZoom: 15,
      	projection: projection,
      	center: [173563, 441818],
      	zoom: 14
      // extent: projection.getExtent() // prevents panning beyond extent of baselayer
    });

 	let map = new ol.Map({
      target: "map",
      controls: [],
      layers: [bagWMTS],
      view: view
    });

})