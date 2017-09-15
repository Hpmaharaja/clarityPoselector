// Import basic React and Google Maps component tools
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// Import an external CSS file delivered by webpac pre-loader configs
import styles from '../styles/clarity.css';

// Create a const function to return the GoogleMap component
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={18}
    center={{lat: props.startlat, lng: props.startlng}}
    onDragEnd={props.onDragEnd}
    onDragStart={props.onDragEnd}>
    <div className={styles.centerMarker}></div>
  </GoogleMap>
));

// Define and Construct the main Position Selector Component
class Poselector extends Component {
	constructor(props) {
		// This constructor sets up the initial data bindings required throuhgout the component
		super(props);

		this.state = {
			startlat: 0,
			startlng: 0
		};

		this.handleMapLoad = this.handleMapLoad.bind(this);
		this.handleMapDrag = this.handleMapDrag.bind(this);
	}

	componentWillMount() {
		// Before the component mounts, we adjust the location based on the user's location
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
			    var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;
				this.setState({startlat: latitude, 
							   startlng: longitude});
			});
		} else {
			console.log('Broswer does not support geolocation!');
		}
	}

	handleMapLoad(map) {
		// Simple check for when map is loaded
		this._mapComponent = map;
		if (map) {
			// console.log('Check: Map is loaded!');
		}
	}

	handleMapDrag(event) {
		// Update the center coordinates when user drags (occurs on both start and end drags)
        let mapRef = this._mapComponent;
        // console.log(mapRef.getBounds().getCenter());
		this.setState({startlat: mapRef.getBounds().getCenter().lat(), startlng: mapRef.getBounds().getCenter().lng()});
	}

	render() {
		// Render the map if the user's current location is found
	  	if (this.state.startlat != 0) {
		    return (
		        <div>
					 <div className="collection">
						<a href="#" className="collection-item active" style={{'textAlign': `center`}}>Clarity React Position Selector</a>
					    <a href="#" className="collection-item active" style={{'textAlign': `center`}}>Lat: {this.state.startlat}</a>
					    <a href="#" className="collection-item active" style={{'textAlign': `center`}}>Long: {this.state.startlng}</a>
				    </div>
		        <GettingStartedGoogleMap
		          containerElement={
		            <div style={{ height: `100%`, 'marginTop': `-15px` }} />
		          }
		          mapElement={
		            <div style={{ position: 'absolute', top: `139px`, left: 0, right: 0, bottom: 0 }} />
		          }
		          onMapLoad={this.handleMapLoad}
		          onDragEnd ={this.handleMapDrag}
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
