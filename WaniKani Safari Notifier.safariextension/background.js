// Copyright (c) 2012, Derek Guenther
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
//
// Ported to Safari by Sebastian Szturo

(function() {
	'use strict';
	
	function updateBadge() {
	        var api_key = safari.extension.settings.apiKey;
	        var icon = safari.extension.toolbarItems[0];
	        
	        if (!api_key) {
	             icon.disabled == true;
	        } else {
	            var xhr = new XMLHttpRequest();
	            xhr.onload = function () {
	                // Parse the JSON
	                var json = xhr.responseText;
	                json = JSON.parse(json);
	
	                // Update the badge
	                var reviews = String(json.requested_information.reviews_available);
	                if (reviews === 0) {
	                    icon.badge = "12";
	                } else {
	                    icon.badge = String(json.requested_information.reviews_available);
	                }
	            };
	            var url = "http://www.wanikani.com/api/v1.1/user/" + encodeURIComponent(api_key) + "/study-queue";
	            xhr.open("GET", url);
	            xhr.send();
	        }
	}
	
	safari.application.addEventListener('command', function( e ) {
		if  ( e.command === 'open-wanikani' ) {
			var win = safari.application.activeBrowserWindow;
			var url = 'http://www.wanikani.com/review';
			if ( win.activeTab.url ) {
				win.openTab().url = url;
			} else {
				win.activeTab.url = url;
			}
		}
	});
	
	// Refresh every 5 minutes
	setInterval(updateBadge, 1000);
	
	updateBadge();
	
})();