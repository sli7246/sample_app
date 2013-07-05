window.onload = function() {
	var jcrop_api;
	var ratio_width = 1; 
	var ratio_height = 1; 
	
	// Upload preview for user to select face before final upload
	function update_crop(coords) {
	  $("#crop_x").val(Math.round(coords.x * ratio_width));
	  $("#crop_y").val(Math.round(coords.y * ratio_height));
	  $("#crop_w").val(Math.round(coords.w * ratio_width));
	  $("#crop_h").val(Math.round(coords.h * ratio_height));
	}
	
	$('#user_avatar').change(function(e) {
		if (typeof jcrop_api != 'undefined') {
	        jcrop_api.destroy();	
			$('#crop_box').remove();
		}
		
	    var file = document.getElementById('user_avatar').files[0];
	    
	    var img = document.createElement("img");
	    img.setAttribute("id", "crop_box");
	    
	    var reader = new FileReader();
	    reader.onload = function() {
	        img.src = reader.result;
	        img.onload = function() {
	        	
	        	// determine the original width of the image
				var ratio_img = $('#crop_box');
				var theImage = new Image();
				theImage.src = ratio_img.attr("src");
				ratio_width = theImage.width/img.width;
				ratio_height = theImage.height/img.height;
				
				// alert("Ratios: " + ratio_width + ", "+ ratio_height);
					        	
	        	$('#crop_box').Jcrop({
	                onChange: update_crop,
					onSelect: update_crop,
					setSelect: [0, 0, 500, 500],
					aspectRatio: 1},
					function(){
	                // Store the Jcrop API in the jcrop_api variable
	                	jcrop_api = this;
	            });
	        };
	    };
	    reader.readAsDataURL(file);  
	    $('#crop_reference').after(img);
	});	
}