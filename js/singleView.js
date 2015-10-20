//ar DetailView = Backbone.View.extend ({
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