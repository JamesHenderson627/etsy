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

// ==============MODEL================
var EtsyListingModel = Backbone.Model.extend({

	url: "https://openapi.etsy.com/v2/listings/active.js?api_key=yililjsgwkddytvpmnn64k3u&includes=MainImage",
	
	parse: function(responseData){
		console.log(responseData)
		return responseData
	}
})

// =====================VIEWS===================

var HomeView = Backbone.View.extend({
	el: "#listings",

	getImage: function(mainImage) {
		if(mainImage === null) {
			return "images/noImage.png"
		} else {
			return mainImage.url_170x135
		}
	},

	getTitle: function(title) {
		var title = title.split(" ")
		if (title.length > 4) {
			return title.slice(0,4).join(" ") + "..."
		} else {return title}
	},

	render: function(){ 
		console.log("Got the home view!!")
		console.log(this.model)
		var listingsArray = this.model.attributes.results,
			htmlString = "",
			self = this
		listingsArray.forEach(function(listing){
			console.log(listing)
			htmlString += `<div class="items">\
								<img src=${self.getImage(listing.MainImage)}>\
								<h5 class="title">${self.getTitle(listing.title)}</h5>\
								<p class="price">\$${listing.price} ${listing.currency_code}</p>\
							</div>`
		})
		this.$el.html(`${htmlString}`)
	},

	initialize: function(){}
})

var DetailView = Backbone.View.extend ({
	el: "#listings",

	initialize: function(){}
})


// =================CONTROLLER==================

var EtsyRouter = Backbone.Router.extend ({
	routes: {

		"*anyquery": "showHomeView"
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
		this.fetcher().success(function(){
			self.hv.render()
		})
	},

	showDetailView: function() {
		console.log("getting the detailed view!!")
		var self = this
		this.fetcher().success(function(){
			self.dv.render()
		})
	},

	initialize: function (){
		this.em = new EtsyListingModel(),
		this.hv = new HomeView({model:this.em}),
		this.dv = new DetailView({model:this.em}),
		Backbone.history.start()
	}
})

new EtsyRouter()







