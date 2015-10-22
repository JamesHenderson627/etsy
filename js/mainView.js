var React = require('react'),
	Parse = require('parse')

var MainView = React.createClass({
	componentDidMount: function() {
		this.props.etsyListings.on("update sync", this.forceUpdate.bind(this))
	},

	render: function() {
		return (
			<div>
				<Header />
				<GridView listingsGrid={this.props.etsyListings} />
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

var GridView = React.createClass({
	componentDidMount: function() {
		console.log (this)
	},

	_getSingleListing: function(listingObj) {
		return (<SingleListing listingInfo={listingObj} />)
	},

	render: function() {
		var singleListing = this.props.listingsGrid.models
		return(
			<div className="listingView">
			{singleListing.map(this._getSingleListing)}
			</div>
			)
	}
})

var SingleListing = React.createClass({
	// componentDidMount: function() {
	// 	console.log (this)
	// },

	_getListingImg: function(){
		if (this.props.listingInfo.attributes.MainImage.url_170x135 === null) {
			return "./images/noImage.png"
		} else {
			return this.props.listingInfo.attributes.MainImage.url_170x135
		}
	},

	_getSingleView: function() {
		console.log("Clicked!!")
		var listingId = this.props.listingInfo.attributes.listing_id
		location.hash = `listings/${listingId}`
		console.log("changing to SinglelView")
	},

	_addToFavorites: function() {
		console.log("Favorite clicked")
		var favObj = new Parse.Object("Favorite"),
			listingObj = this.props.listingInfo.attributes
		for (var props in listingObj) {
			favObj.set(props, listingObj[props])
		}
		favObj.save().then(function(){
			alert("Added to Favorites!")
		})
	},

	render: function() {
		var listingImg = this._getListingImg(),
			listingTitle = this.props.listingInfo.attributes.title,
			listingPrice = "$" + this.props.listingInfo.attributes.price
		return (
			<div className="items">
				<button type="button" className="favorite"onClick={this._addToFavorites}><i className="fa fa-heart-o"></i></button>
				<img src={listingImg} />
				<h5 className="title" onClick={this._getSingleView}>{listingTitle}</h5>
				<p className="price">{listingPrice}</p>
			</div>
			)
	}
})

export default MainView


