import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    center={{lat: props.startlat, lng: props.startlng}}
    onClick={props.onMapClick}
    onDragEnd={props.onDragEnd}
  >
    {props.marker.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

class Poselector extends Component {
	constructor(props) {
		// This constructor sets up the initial data/bindings required throuhgout the component
		super(props);

		this.state = {
			marker: [{
				position: {
					lat: 25.0112183,
					lng: 121.52067570000001,
				},
				key: `Irvine`,
				defaultAnimation: 2
			}],
			startlat: 0,
			startlng: 0
		};

		this.handleMapLoad = this.handleMapLoad.bind(this);
		this.handleMapClick = this.handleMapClick.bind(this);
		this.handleMapDrag = this.handleMapDrag.bind(this);
	}

	componentWillMount() {
		// Before the component mounts, we adjust the location based on the user's location
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
			    var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;
				this.setState({startlat: latitude, 
							   startlng: longitude, 
							   marker: [{
							        position: {lat: latitude, lng: longitude},
							        defaultAnimation: 2,
							        key: Date.now(), 
			      				},]
			    });
			});
		} else {
			console.log('Broswer does not support geolocation!');
		}
	}

	handleMapLoad(map) {
		// Simple check for when map is loaded
		this._mapComponent = map;
		if (map) {
			console.log('Map is loaded!');
		}
	}

	handleMapClick(event) {
		// Listen & Handle for a click event from user
	    const newMarker = [
	      {
	        position: {lat: this._mapComponent.getCenter().lat(), lng: this._mapComponent.getCenter().lat()},
	        defaultAnimation: 2,
	        key: Date.now(), 
	      },
	    ];
	    this.setState({marker: newMarker});
	}

	handleMapDrag(event) {
        let mapRef = this._mapComponent;
        console.log(mapRef.getCenter().lat()+'; '+mapRef.getCenter().lng());
		console.log('Map has been dragged');
		this.setState({startlat: mapRef.getCenter().lat(), startlng: mapRef.getCenter().lat()});
	}

	render() {
		// Render the map if the user's current location is found
	  	if (this.state.startlat != 0) {
		    return (
		        <div>
			      	<nav>
					    <div className="nav-wrapper blue darken-3">
					      <a href="#" className="brand-logo">Clarity Position Selector Component </a>
					      <ul id="nav-mobile" className="right hide-on-med-and-down">
					      	<li><a>Latitude: {this.state.marker[0].position.lat}</a></li>
					        <li><a>Longitude: {this.state.marker[0].position.lng}</a></li>
					      </ul>
					    </div>
					</nav>
		        <GettingStartedGoogleMap
		          containerElement={
		            <div style={{ height: `100%` }} />
		          }
		          mapElement={
		            <div style={{ height: `800px` }} />
		          }
		          onMapLoad={this.handleMapLoad}
		          onMapClick={this.handleMapClick}
		          onDragEnd ={this.handleMapDrag}
		          marker={this.state.marker}
		          startlat={this.state.startlat}
		          startlng={this.state.startlng}
		        />
		      </div>
		    );
		} else {
			return (<span>Loading Maps...</span>);
		}
	}
}

// Export the component for the React app to utilize
export default Poselector;
