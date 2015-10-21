var React = require('react')

var FavView = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<FavGrid listingsGrid={this.props.favListings} />
			</div>
			)
	}
})

var Header = React.createClass({
	_handleKeyPress: function() {
		if (event.keyCode === 13) {
			console.log('------',event)
			location.hash = `search/${event.target.value}`
			event.target.value = ""
		}
	},

	_goToFavs: function() {
		location.hash = "favorites/"
		console.log("Going to favorites")
	},

	render: function() {
		return(
			<div id="header">
				<h3 id="logo">Etsy</h3>
    			<input type="text" onKeyPress={this._handleKeyPress} placeholder="Search for items or shops"/>
    			<h4 id="favs" onClick={this._goToFavs}>Favorites</h4>
			</div>
			)
	}
})

var FavGrid = React.createClass({
	render: function() {
		return(
			<div></div>
			)
	}
})

export default FavView

