// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
	Backbone = require('backbone'),
	React = require('react')

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

import MainView from "./mainView.js"

// ==============COLLECTION================
var EtsyCollection = Backbone.Collection.extend({

	url: "https://openapi.etsy.com/v2/listings/active.js",
	apiKey: "yililjsgwkddytvpmnn64k3u",
	parse: function(responseData){
		console.log(responseData)
		return responseData.results
	}
})

// ============MODELS===============

var SingleModel = Backbone.Model.extend({

	url: "https://openapi.etsy.com/v2/listings/",
	apiKey: "yililjsgwkddytvpmnn64k3u",
	parse: function(responseData){
		console.log(responseData)
		return responseData
	}
})

// // =================CONTROLLER==================
var ec = new EtsyCollection

ec.fetch({
	data: {
		api_key: ec.apiKey,
		includes: "MainImage"
	},
	dataType: "jsonp",
	processData: true
}).then(React.render(<MainView etsyListings={ec} />,document.querySelector("#container")))
console.log(ec)
// var EtsyRouter = Backbone.Router.extend ({
// 	routes: {
// 		"listings/:listing_id":"showDetailView",
// 		"*anyquery": "showHomeView",
// 	},

// 	fetcher: function() {
// 		return this.em.fetch({
// 			dataType: "jsonp",
// 			processData: true
// 		})
// 	},

// 	showHomeView: function() {
// 		console.log("getting the home view!!")
// 		var self = this
// 		this.ec.fetch({
// 			data: {
// 				api_key: this.ec.apiKey,
// 				includes: "MainImage"
// 			},
// 			dataType: "jsonp",
// 			processData: true
// 		}).done(function(){self.hv.render()})
// 	},

// 	showDetailView: function(id) {
// 		console.log("getting the detailed view!!")
// 		var self = this
// 		this.sm.fetch({
// 			url: this.sm.url + id +".js",
// 			data: {
// 				api_key: this.sm.apiKey,
// 				includes: "MainImage"
// 			},
// 			dataType: "jsonp",
// 			processData: true
// 		}).done(function(){self.dv.render()})
// 	},

// 	initialize: function (){
// 		this.ec = new EtsyCollection(),
// 		this.sm = new SingleModel(),
// 		this.hv = new HomeView({collection: this.ec}),
// 		this.dv = new DetailView({model: this.sm}),
// 		Backbone.history.start()
// 	}
// })

// new EtsyRouter()







