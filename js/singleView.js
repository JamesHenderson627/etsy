var React = require('react')

import {Header} from "./mainView.js"

var SingleView = React.createClass({
	componentDidMount: function() {
		this.props.singleListing.on("update sync", this.forceUpdate.bind(this))
	},

	render: function() {
		return(
			<div>
				<Header />
				<SingleListing singleItem={this.props.singleListing} />
			</div>
			)
	}
})

var SingleListing = React.createClass({
	componentDidMount: function() {
		console.log(this)
	},

	render: function(){
		var	title = this.props.singleItem.attributes.title
			// image = this.props.singleItem.attributes.MainImage.url_570xN,
			console.log(this.props.singleItem.attributes.MainImage)
		var	description = this.props.singleItem.attributes.description,
			price = "$" + this.props.singleItem.attributes.price,
			views = this.props.singleItem.attributes.views
		return(
			<div id="singleListing">
				
			</div>
		 	)
	}
})


//				
//				
// 	el: "#listings",

// 	render: function() {
// 		console.log("got the detailed view")
// 		console.log(this.model)
// 		var listing = this.model.attributes.results[0],
// 			title = listing.title,
// 			image = listing.MainImage.url_570xN,
// 			description = listing.description,
// 			price = listing.price,
// 			views = listing.views,
// 			htmlString = `<div id="singleListing">
// 							<h3 id="title">${title}</h3>
// 							<img id="pic" src="${image}">
// 							<h4>Details</h4>
// 							<p id="description">${description}</p>
// 							<p id="price">\$${price}</p>
// 							<p id="views">Views: ${views}
// 						</div>`
// 		this.$el.html(`${htmlString}`)
// 	},

// 	initialize: function(){}
// })

export default SingleView