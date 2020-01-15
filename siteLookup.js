new Vue({
	el:"#app",
	data: {
		test: "Hello World",
		pg: [],
		searchTbl: '',
		regionDD: '',
		url: 'https://isogunro.sharepoint.com/sites/demos/mdemos/Lists/Site%20Lookup/EditForm.aspx?ID=',
		urlEnd: '&Source=https://isogunro.sharepoint.com/sites/demos/mdemos/SitePages/siteLookup.aspx'
	},
	created: function() {
		this.getListData('Site Lookup');
	},
	methods: {
		getListData: function(lname){
		    var endPointUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+lname+"')/items";
	        var headers = {
	        		"accept": "application/json;odata=verbose"
	            };
	        
	        var that = this;   
					axios.get(endPointUrl).then(function(response){
						that.pg = response.data.value;
					})           
					.catch(function(error){
						console.log(error);
					})

		},
		editForm: function(id){
		alert(this.url+id);
			//window.location.replace(this.url+id);
		},
		cascade: function(e){
			var newPg = this.pg.filter(function(item){
				console.log(item.Title+"="+e.target.value);
				return item.Title == e.target.value;
			});			
		}
	},
	computed: {
	    filterRegions: function(){
	      var selectedRegion = this.regionDD;
	      var filter = this.searchTbl;
	
	      if (selectedRegion) {
	        return this.pg.filter(function (item) {
	          if (filter) {
	            //return item.Region === selectedRegion && item.Site.startsWith(filter);
	            return item.Title === selectedRegion && item.Site.toLowerCase().indexOf(filter.toLowerCase())>= 0;
	          }
	
	          return item.Title === selectedRegion;
	        });
	      } else {
	        return this.pg;
	      }
	    }
	}
});