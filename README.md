#### General ##

Enable attaching _polygons_ to other layers during draw or edit features with **Leaflet.Draw**. Checkout [demo](https://krzyhook.github.io/Leaflet.Pin/).

This is adjustment of the original [Leaflet.Pin](https://kklimczak.github.io/Leaflet.Pin/) to the newest `leaflet.js` and `leaflet.draw.js` which is no longer maintained.

#### Dependencies ##

It depends on [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil) and [Leaflet.Draw](https://github.com/Leaflet/Leaflet.draw).

## Usage ##
You can download Leaflet.Pin from this repository

After download add [leaflet.js](https://github.com/Leaflet/Leaflet), [leaflet.draw.js](https://github.com/Leaflet/Leaflet.draw), [leaflet.geomtryutil.js]((https://github.com/makinacorpus/Leaflet.GeometryUtil)), `leaflet.pin.js` to your html file.

#### Configuration

Add to your map options properties:

**General options**
```
var map = L.map('map', {
  pin: true,
  pinControl: true,
  guideLayers: []
});
```

| Option | Type | Default | Description |
|---|---|---|---|
| pin | Boolean | false | Enable pin on map.|
| pinCircle | Boolean | false | Enable pin to circle. It's a first implementation and could have some bugs. |
| pinControl | Boolean | false | Enable Pin Control to toggle pin. |
| guideLayers | Array | [] | Array containing guide layers. You can include single layer like L.Marker or layerGroup/FeatureGroup.
**Feature option**
```
var drawControl = new L.Control.Draw({
  draw: {
    polyline: {
      distance: 20
      vertices: true
    },
    polygon: {
      distance: 25
    },
    marker: {
      distance: 25
    },
    rectangle: false,
    circle: false
  }
}
```
For each feature (rectangle and circle not supported yet):

| Option | Type | Default | Description |
|---|---|---|---|
| distance | Number | 20 | Distance in pixels where pin occurd |
| vertices | Boolean | true | Whether layers vertices add additional pin attraction. |


#### Map methods

| Method | Params | Description |
|---|---|---|
| addGuideLayer | ILayer or FeatureGroup | add new layer or FeatureGroup as guide layer/-s. Each added FeatureGroup is parsing to single guide layers. Additionally after add/remove layer to FeatureGroup, this layer is automatic added to/removed from guide layers container. |
| removeGuideLayer | ILayer | remove single layer from guide layers container. |
| togglePin | - | switch on/off pin |

```
map.addGuideLayer(new L.FeatureGroup());
```

This plugin based on [Leaflet.Pin](https://kklimczak.github.io/Leaflet.Pin/) and [Leaflet.Snap](https://github.com/makinacorpus/Leaflet.Snap).
