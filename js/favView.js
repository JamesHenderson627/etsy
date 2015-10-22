var React = require('react')

var FavView = React.createClass({
	componentWillMount: function() {
		console.log(this)
	},

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
	_getSingleFavListing: function(listingObj){
		return (<SingleFavListing favListingInfo={listingObj} />)
	},

	render: function() {
		var singleFavListing = this.props.listingsGrid
		return(
			<div className="listingView">
				{singleFavListing.map(this._getSingleFavListing)}
			</div>
			)
	}
})

var SingleFavListing = React.createClass({
	componentWillMount: function() {
		console.log(this)
	},

	_getListingImg: function(){
		if (this.props.favListingInfo.attributes.MainImage.url_170x135 === null) {
			return "./images/noImage.png"
		} else {
			return this.props.favListingInfo.attributes.MainImage.url_170x135
		}
	},

	_getSingleView: function() {
		console.log("Clicked!!")
		var listingId = this.props.favListingInfo.attributes.listing_id
		location.hash = `listings/${listingId}`
		console.log("changing to SinglelView")
	},

	render: function() {
		var listingImg = this._getListingImg(),
			listingTitle = this.props.favListingInfo.attributes.title,
			listingPrice = "$" + this.props.favListingInfo.attributes.price
		return (
			<div className="items">
				<img src={listingImg} />
				<h5 className="title" onClick={this._getSingleView}>{listingTitle}</h5>
				<p className="price">{listingPrice}</p>
			</div>
			)
	}
})

export default FavView

