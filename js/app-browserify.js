// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
	Backbone = require('backbone')

console.log('loaded javascript')

// other stuff that we don't really use in our own code
// var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
// var Router = require('./app.js')

// window.addEventListener('load', app)

// function app() {
    // start app
    // new Router()
// }

// ==============COLLECTION================
var EtsyCollection = Backbone.Collection.extend({

	url: "https://openapi.etsy.com/v2/listings/active.js",
	apiKey: "yililjsgwkddytvpmnn64k3u",
	parse: function(responseData){
		console.log(responseData)
		return responseData
	}
})

// ============MODELS===============

var SingleModel = Backbone.Model.extend({

	url: "https://openapi.etsy.com/v2/listings/",
	apiKey: "yililjsgwkddytvpmnn64k3u",
	parse: function(responseData){
		return responseData
	}
})

// =====================VIEWS===================

var HomeView = Backbone.View.extend({
	el: "#listings",

	events: {
		"click input": "getNewView",
		"click img": "getDetailView"
	},

	getDetailView: function(event) {
		console.log("Clicked!!")
		var divClicked = event.target,
			listingHashId = divClicked.getAttribute("data-id")
			console.log(listingHashId)
		location.hash = `listings/${listingHashId}`
		console.log("changing to DetailView")
	},

	getImage: function(mainImage) {
		if(mainImage === null) {
			return "../images/noImage.png"
		} else {
			return mainImage.url_170x135
		}
	},

	getTitle: function(title) {
		// var title = title.split(" ")
		if (title.length > 12) {
			return title.slice(0,25) + "..."
		} else {return title}
	},

	render: function(){ 
		console.log("Got the home view!!")
		console.log(this.collection)
		var listingsArray = this.collection.models[0].attributes.results,
			htmlString = "",
			self = this
		listingsArray.forEach(function(listing){
			console.log(listings)
			htmlString += `<div class="items">
								<img data-id=${listing.listing_id} src=${self.getImage(listing.MainImage)}>
								<h5 class="title">${self.getTitle(listing.title)}</h5>
								<p class="price">\$${listing.price} ${listing.currency_code}</p>
							</div>`
		})
		this.$el.html(`${htmlString}`)
	},

	initialize: function(){}
})

var DetailView = Backbone.View.extend ({
	el: "#listings",

	render: function() {
		console.log("got the detailed view")
		console.log(this.model)
		var listing = this.model.attributes.results[0],
			title = listing.title,
			image = listing.MainImage.url_570xN,
			description = listing.description,
			price = listing.price,
			views = listing.views,
			htmlString = `<div id="singleListing">
							<h3 id="title">${title}</h3>
							<img id="pic" src="${image}">
							<h4>Details</h4>
							<p id="description">${description}</p>
							<p id="price">\$${price}</p>
							<p id="views">Views: ${views}
						</div>`
		this.$el.html(`${htmlString}`)
	},

	initialize: function(){}
})


// =================CONTROLLER==================

var EtsyRouter = Backbone.Router.extend ({
	routes: {
		"listings/:listing_id":"showDetailView",
		"*anyquery": "showHomeView",
	},

	fetcher: function() {
		return this.em.fetch({
			dataType: "jsonp",
			processData: true
		})
	},

	showHomeView: function() {
		console.log("getting the home view!!")
		var self = this
		this.ec.fetch({
			data: {
				api_key: this.ec.apiKey,
				includes: "MainImage"
			},
			dataType: "jsonp",
			processData: true
		}).done(function(){self.hv.render()})
	},

	showDetailView: function(id) {
		console.log("getting the detailed view!!")
		var self = this
		this.sm.fetch({
			url: this.sm.url + id +".js",
			data: {
				api_key: this.sm.apiKey,
				includes: "MainImage"
			},
			dataType: "jsonp",
			processData: true
		}).done(function(){self.dv.render()})
	},

	initialize: function (){
		this.ec = new EtsyCollection(),
		this.sm = new SingleModel(),
		this.hv = new HomeView({collection: this.ec}),
		this.dv = new DetailView({model: this.sm}),
		Backbone.history.start()
	}
})

new EtsyRouter()







