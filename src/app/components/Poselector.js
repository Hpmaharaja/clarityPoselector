import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{lat: props.startlat, lng: props.startlng}}
    onClick={props.onMapClick}
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
		this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
		this.handleLongClick = this.handleLongClick.bind(this);
		this.handleConfirmLocation = this.handleConfirmLocation.bind(this);
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
	        position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
	        defaultAnimation: 2,
	        key: Date.now(), 
	      },
	    ];
	    this.setState({marker: newMarker});
	}

	handleMarkerRightClick(targetMarker) {
		// Listen and Handle Right Click for Removing the Pinned Location
	    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
	    this.setState({marker: nextMarkers});
	}

	handleLongClick() {
		console.log('longpress');
	}

	handleConfirmLocation() {
		// Alert the browser with the necessary latitude and longitude based on user's desire
	  	alert('The latitude is: ' + this.state.marker[0].position.lat + ' and longitude is: ' + this.state.marker[0].position.lng);
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
					        <li><button onClick={this.handleConfirmLocation} className="btn blue lighten-1 waves-effect waves-dark">
						  		Confirm Location 
							</button></li>
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
		          onMapLongClick={this.handleLongClick}
		          marker={this.state.marker}
		          onMarkerRightClick={this.handleMarkerRightClick}
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
