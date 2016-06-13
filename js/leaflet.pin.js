(function() {
L.Handler.MarkerPin = L.Handler.extend({
  options: {
    distance: 20,
    vertices: true
  },

  initialize: function(map, marker, options) {
    L.Handler.prototype.initialize.call(this, map);
  },

  enable: function (marker) {
    console.log('enable');
    if (marker) {
      this._observeMarker(marker);
    }
  },

  disable: function () {
    console.log('disable');
    this._unobserveMarker();
  },

  _observeMarker: function (marker) {
    console.log('observeMarker');
    marker.on('move', this._updateLatLng, this);
  },

  _unobserveMarker: function () {
    console.log('unobserveMarker');
    marker.off('move', this._updateLatLng, this);
  },

  _updateLatLng: function (e) {
    var marker = e.target;
    marker.setIcon(marker.options.icon);
    marker.setOpacity(1);
    L.DomUtil.addClass(marker._icon, 'leaflet-marker-icon leaflet-div-icon leaflet-editing-icon leaflet-pin-marker');
    var latlng = marker.getLatLng();
    console.log(e);
    var closest = this._findClosestMarker(this._map, [L.polyline([[51,0],[51,1]])], latlng, 150, true);
    console.log(closest);
    if (closest != null) {
      marker._latlng = closest.latlng;
      marker.update();
    }
  },

  _findClosestMarker: function (map, layers, latlng, distance, vertices) {
    return L.GeometryUtil.closestLayerSnap(map, layers, latlng, distance, vertices);
  }

});

L.Draw.Feature.Pin = {
  _pin_initialize: function () {
    console.log('_pin_initialize');
    this.on('enabled', this._pin_on_enabled, this);
    this.on('disabled', this._pin_on_disabled, this);
  },

  _pin_on_enabled: function () {
    console.log('_pin_on_enabled');
    var marker = this._mouseMarker;
    if (!this.pinning) {
      this._pinning = new L.Handler.MarkerPin(this._map);
    }
    this._pinning.enable(marker);
    // console.log(marker);
    // this._mouseMarker.on('move', function (e) {
    //   console.log(e);
    //   marker._latlng = L.latLng(51,0);
    //   marker.update();
    // })
    // if (this instanceof L.Marker) {
    //   console.log('marker');
    // }
  },

  _pin_on_disabled: function () {
    console.log('_pin_on_disabled');
    delete this._pinning;
  }
};

L.Draw.Feature.include(L.Draw.Feature.Pin);
L.Draw.Feature.addInitHook('_pin_initialize');
})()
