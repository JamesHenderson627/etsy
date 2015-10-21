// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
	Backbone = require('backbone'),
	React = require('react'),
	Parse = require('parse')

console.log('loaded javascript')

import MainView from "./mainView.js"

import SingleView from "./singleView.js"

import FavView from "./favView.js"

//====================KEYS===============
var APP_ID = "BqAcKMmMxybYzVlWhQ9FIL0supv9KAyvXvr23VyT",
	JS_KEY = "doxrrItd3drsvRu4Fb9ENwA56THRVd0Pi4iR5w8h",
	REST_API_KEY = "JzVJGbl4f4QdBEmVwADJI6eSYSOdisDWSRllUrfi"

Parse.initialize(APP_ID,JS_KEY)

// ==============COLLECTION================
var EtsyCollection = Backbone.Collection.extend({

	url: "https://openapi.etsy.com/v2/listings/active.js",
	apiKey: "yililjsgwkddytvpmnn64k3u",
	
	parse: function(responseData){
		console.log(responseData.results)
		return responseData.results
	}
})

var FavCollection = Backbone.Collection.extend({
	url: "https://api.parse.com/1/classes/Favorite",

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	},

	model: FavModel,

	parse: function() {
		console.log(responseData.results)
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

var FavModel = Backbone.Model.extend({
	url: "https://api.parse.com/1/classes/Favorite",

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
		"X-Parse-REST-API-Key": REST_API_KEY
	}
})

// // =================CONTROLLER==================
var EtsyRouter = Backbone.Router.extend ({
	routes: {
		"favorites": "showFavorites",
		"search/:query": "showSearch",
		"listings/:listing_id": "showSingleView",
		"*anyquery": "showHomeView",
	},

	showHomeView: function() {
		console.log("Fetching the default listing!!")
		var self = this
		this.ec.fetch({
			data: {
				api_key: this.ec.apiKey,
				includes: "MainImage"
			},
			dataType: "jsonp",
			processData: true
		}).then(function(){
			React.render(<MainView etsyListings={self.ec} />,document.querySelector("#container"))
		})
		console.log(this.ec)
	},

	showSearch: function(searchQuery) {
		console.log("Getting searched things!!")
		var self = this
		this.ec.fetch ({
			data: {
				keywords: searchQuery,
				api_key: this.ec.apiKey,
				includes: "MainImage" 
			},
			dataType: "jsonp",
			processData: true
		}).then(function(){
			React.render(<MainView etsyListings={self.ec} />,document.querySelector("#container"))
		})
		console.log(this.ec)
	},

	showSingleView: function(listingId) {
		console.log("Fetching the Single View!!")
		var self = this
		this.sm.fetch({
			url: `${this.sm.url}/${listingId}.js`,
			data: {
				api_key: this.sm.apiKey,
				includes: "MainImage"
			},
			dataType: "jsonp",
			processData: true
		}).then(React.render(<SingleView etsyListing={self.sm} />,document.querySelector("#container")))
		console.log(this.sm)
	},

	showFavorites: function() {
		React.render(<FavView favListings={this.fc} />,document.querySelector("#container"))
	},

	initialize: function() {
		this.ec = new EtsyCollection(),
		this.fc = new FavCollection(),
		this.sm = new SingleModel(),
		this.fv = new FavModel()
		Backbone.history.start()
	}
})

var er = new EtsyRouter()










