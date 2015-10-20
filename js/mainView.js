var React = require('react')

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
			location.hash = `listings/${event.target.value}`
			event.target.value = ""
		}
	},

	render: function() {
		return(
			<div id="header">
				<h3 id="logo">Etsy</h3>
    			<input type="text" onKeyPress={this._handleKeyPress} placeholder="Search for items or shops"/>
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
			<div id="listingView">
			{singleListing.map(this._getSingleListing)}
			</div>
			)
	}
})

var SingleListing = React.createClass({
	componentDidMount: function() {
		console.log (this)
	},

	_getListingImg: function(){
		if (this.props.listingInfo.attributes.MainImage.url_170x135 === null) {
			return "./images/noImage.png"
		} else {
			return this.props.listingInfo.attributes.MainImage.url_170x135
		}
	},

	_clickHandler: function() {
		console.log("Clicked!!")
		var listingId = this.props.listingInfo.attributes.listing_id
		location.hash = `listings/${listingId}`
		console.log("changing to DetailView")

	},

	render: function() {
		var listingImg = this._getListingImg(),
			listingTitle = this.props.listingInfo.attributes.title,
			listingPrice = "$" + this.props.listingInfo.attributes.price
		return (
			<div className="items" onClick={this._clickHandler} >
				<img src={listingImg} />
				<h5 className="title">{listingTitle}</h5>
				<p className="price">{listingPrice}</p>
			</div>
			)
	}
})

export default MainView