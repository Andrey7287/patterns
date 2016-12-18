
	var octagon,
		overlay,
		target,
		mapContacts;

OctagonOverlay.prototype = new google.maps.OverlayView();
CustomMarker.prototype = new google.maps.OverlayView();
MarkerTarget.prototype = new google.maps.OverlayView();

// add and remove contacts upon the map after zoom change
mapContacts = {
	
	contacts_ : null,
	add: function () {
		
		if ( this.contacts_ ) {return};
		
		//get contact from footer
		var $contact = $('.footer__item--left').clone();
		//remove footer class
		$contact.removeClass('footer__item footer__item--left');
		//styling
		$contact.css('position', 'absolute')
						.css('top', '50px')
						.css('left', '10px')
						.css('background', 'rgba(0,0,0,.3)')
						.css('color', '#fff')
						.css('padding', '10px');
		$contact.find('a').css('color', '#fff');
		//add to map
		$('#map').append($contact);
		
		this.contacts_ = $contact;
		
	},
	remove: function () {
		
		this.contacts_.remove();
		this.contacts_ = null; 
		
	}
	
};

function initMap() {
	var viewPort = window.matchMedia("(min-width: 768px)").matches,
		center = viewPort ? {
			lat: 55.685973,
			lng: 37.339480
		} : {
			lat: 55.6845,
			lng: 37.3395
		}, 
		zoom = viewPort ? 15 : 14,
		//for Octagon
		srcOctagon = '/bitrix/templates/site-template/images/map/octagon.png',
		boundsOctagon = new google.maps.LatLngBounds(new google.maps.LatLng(55.681214, 37.332493), new google.maps.LatLng(55.688182, 37.346698)),
		//for target
		srcTarget = '/bitrix/templates/site-template/images/map/squre.png',
		boundsTarget = new google.maps.LatLngBounds(new google.maps.LatLng(55.684064, 37.341056), new google.maps.LatLng(55.684789, 37.342386)),
		//HTML el
		el = document.getElementById('mapContact'),
		boundsEl = new google.maps.LatLngBounds(new google.maps.LatLng(55.684890, 37.322298), new google.maps.LatLng(55.690721, 37.334315));
	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: center,
		scrollwheel: false,
		zoom: zoom,
		"elementType": "geometry.fill"
	});


	octagon = new OctagonOverlay(boundsOctagon, srcOctagon, map);
	target = new MarkerTarget(boundsTarget, srcTarget, map);

	if ( viewPort ) {

		overlay = new CustomMarker(boundsEl, el, map);

		map.addListener('zoom_changed', function() {

			if ( map.getZoom() !== zoom ) {
				overlay.onRemove();
				mapContacts.add();
			} else {
				overlay = new CustomMarker(boundsEl, el, map);
				mapContacts.remove();
			}

  		});

	} else { 
		document.getElementById('mapContact').hidden = true;
	}

}

/** @constructor */
function OctagonOverlay(bounds, image, map) {
	// Initialize all properties.
	this.bounds_ = bounds;
	this.image_ = image;
	this.map_ = map;
	// Define a property to hold the image's div. We'll
	// actually create this div upon receipt of the onAdd()
	// method so we'll leave it null for now.
	this.div_ = null;
	// Explicitly call setMap on this overlay.
	this.setMap(map);
}
/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
OctagonOverlay.prototype.onAdd = function () {
	var div = document.createElement('div');
	div.style.borderStyle = 'none';
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';
	// Create the img element and attach it to the div.
	var img = document.createElement('img');
	img.src = this.image_;
	img.style.width = '100%';
	img.style.height = '100%';
	img.style.position = 'absolute';
	div.appendChild(img);
	this.div_ = div;
	// Add the element to the "overlayLayer" pane.
	var panes = this.getPanes();
	panes.overlayLayer.appendChild(div);
};
OctagonOverlay.prototype.draw = function () {
	// We use the south-west and north-east
	// coordinates of the overlay to peg it to the correct position and size.
	// To do this, we need to retrieve the projection from the overlay.
	var overlayProjection = this.getProjection();
	// Retrieve the south-west and north-east coordinates of this overlay
	// in LatLngs and convert them to pixel coordinates.
	// We'll use these coordinates to resize the div.
	var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
	// Resize the image's div to fit the indicated dimensions.
	var div = this.div_;
	div.style.left = sw.x + 'px';
	div.style.top = ne.y + 'px';
	div.style.width = (ne.x - sw.x) + 'px';
	div.style.height = (sw.y - ne.y) + 'px';
};
// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
OctagonOverlay.prototype.onRemove = function () {
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
};








/** @constructor */
function CustomMarker(bounds, el, map) {
	// Initialize all properties.
	this.bounds_ = bounds;
	this.el_ = el;
	this.map_ = map;
	// Define a property to hold the image's div. We'll
	// actually create this div upon receipt of the onAdd()
	// method so we'll leave it null for now.
	this.div_ = null;
	// Explicitly call setMap on this overlay.
	this.setMap(map);
}
/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
CustomMarker.prototype.onAdd = function () {
	var div = document.createElement('div');
	div.style.borderStyle = 'none';
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';
	// Create the img element and attach it to the div.
	var el = this.el_;
	el.style.width = '100%';
	el.style.height = '100%';
	el.style.position = 'absolute';
	div.appendChild(el);
	this.div_ = div;
	// Add the element to the "overlayLayer" pane.
	var panes = this.getPanes();
	panes.overlayLayer.appendChild(div);
};
CustomMarker.prototype.draw = function () {
	// We use the south-west and north-east
	// coordinates of the overlay to peg it to the correct position and size.
	// To do this, we need to retrieve the projection from the overlay.
	var overlayProjection = this.getProjection();
	// Retrieve the south-west and north-east coordinates of this overlay
	// in LatLngs and convert them to pixel coordinates.
	// We'll use these coordinates to resize the div.
	var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
	// Resize the image's div to fit the indicated dimensions.
	var div = this.div_;
	div.style.left = sw.x + 'px';
	div.style.top = ne.y + 'px';
	div.style.width = (ne.x - sw.x) + 'px';
	div.style.height = (sw.y - ne.y) + 'px';
};
// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
CustomMarker.prototype.onRemove = function () {
	if ( !this.div_ ) { return };
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
	this.setMap(null);
};




/** @constructor */
function MarkerTarget(bounds, image, map) {
	// Initialize all properties.
	this.bounds_ = bounds;
	this.image_ = image;
	this.map_ = map;
	// Define a property to hold the image's div. We'll
	// actually create this div upon receipt of the onAdd()
	// method so we'll leave it null for now.
	this.div_ = null;
	// Explicitly call setMap on this overlay.
	this.setMap(map);
}
/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
MarkerTarget.prototype.onAdd = function () {
	var div = document.createElement('div');
	div.style.borderStyle = 'none';
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';
	// Create the img element and attach it to the div.
	var img = document.createElement('img');
	img.src = this.image_;
	img.style.width = '100%';
	img.style.height = '100%';
	img.style.position = 'absolute';
	div.appendChild(img);
	this.div_ = div;
	// Add the element to the "overlayLayer" pane.
	var panes = this.getPanes();
	panes.overlayLayer.appendChild(div);
};
MarkerTarget.prototype.draw = function () {
	// We use the south-west and north-east
	// coordinates of the overlay to peg it to the correct position and size.
	// To do this, we need to retrieve the projection from the overlay.
	var overlayProjection = this.getProjection();
	// Retrieve the south-west and north-east coordinates of this overlay
	// in LatLngs and convert them to pixel coordinates.
	// We'll use these coordinates to resize the div.
	var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
	// Resize the image's div to fit the indicated dimensions.
	var div = this.div_;
	div.style.left = sw.x + 'px';
	div.style.top = ne.y + 'px';
	div.style.width = (ne.x - sw.x) + 'px';
	div.style.height = (sw.y - ne.y) + 'px';
};
// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
MarkerTarget.prototype.onRemove = function () {
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
};



google.maps.event.addDomListener(window, 'load', initMap);			
