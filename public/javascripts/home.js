$( document ).ready(function() {

	var colors = ['blue','grey','grey','orange']
	var images = ['design','improvements','risk','chain']
	//var titles = ['OPERATIONAL IMPROVEMENT','ENTERPRISE RISK MANAGEMENT','SUPPLY CHAIN OPTERMISATION','SYSTEM DESIGN']
	var projectAreas =[];
	var products = [];
	var projectsHtml = ''

	$.getJSON('/products/productlist', function(data) {

		products = data;
		
		$.getJSON('/projectareas/projectarealist', function(data2) {

			projectAreas = data2;
			console.log(projectAreas[3]);

			var productCount = 0;
			var colorCount = 0;

			$.each(products, function() {
	            
				console.log(colorCount);

	            if(productCount <= 7)
	            {
		            if(this.featuredProduct)
		            {
			            
			            if (productCount % 4 == 0) 
						{
							projectsHtml+= '<div class="row imagerow">';
						}

					    if(productCount>3)
					    {
					    	if($(window).width() >= 800)
					    	{
					    		projectsHtml+= '<div class="col-sm-3 imagecol-md-3 box back-' + colors[colorCount] + '">';
					    	}
					    	else
					    	{
					    		projectsHtml+= '<div class="col-sm-6 imagecol-md-3 box back-' + colors[colorCount] + '">';
					    	}
					    	
					    	projectsHtml+='<a href="#">'
					    	projectsHtml+='<div class="outer">';
					    	projectsHtml+='<div class="middle">';
					    	projectsHtml+='<div class="inner">';
					    	projectsHtml+= '<img src="/images/' + images[colorCount] + '.png" />'
					    	projectsHtml+= '<h2>' + projectAreas[colorCount].projectAreaName + '</h2>'
							projectsHtml+='</div>';
							projectsHtml+='</div>';
							projectsHtml+='</div>';
							projectsHtml+='</a>'
					    	projectsHtml+='</div>';
						}

					    if($(window).width() >= 800)
					    {
					    	projectsHtml+= '<div class="col-sm-3 imagecol-md-3" onmouseover="displayhover(this)" onmouseout="hidehover(this)">';
						}
						else
						{
							projectsHtml+= '<div class="col-sm-6 imagecol-md-3" onmouseover="displayhover(this)" onmouseout="hidehover(this)">';
						}
					    projectsHtml+= '<a href="/products/' + this._id + '">'
					    projectsHtml+= '<div class="popupheader">';
					    projectsHtml+= '<h2>' + this.productName + '</h2>';
						projectsHtml+= '</div>';
					   	projectsHtml+= '<div class="popupdesc">';
					    projectsHtml+= '<h3>' + this.productStrapLine + '</h3>';
					    projectsHtml+= '<p>' + this.productDescription.substring(0,100) + '...</p>';
					    projectsHtml+= '</div>';
					    projectsHtml+= '<img src="' + this.mainImageUrl + '" height="234" width="100%" alt=""/>';
					    projectsHtml+= '</a>'
					    projectsHtml+= '</div>';
					    
					    productCount = productCount + 1;

					    
					    if(productCount<=3)
					    {
					    	if($(window).width() >= 800)
					    	{
					    		projectsHtml+= '<div class="col-sm-3 imagecol-md-3 box back-' + colors[colorCount] + '">';
					    	}
					    	else
					    	{
					    		projectsHtml+= '<div class="col-sm-6 imagecol-md-3 box back-' + colors[colorCount] + '">';
					    	}
					    	projectsHtml+='<a href="#">'
					    	projectsHtml+='<div class="outer">';
					    	projectsHtml+='<div class="middle">';
					    	projectsHtml+='<div class="inner">';
					    	projectsHtml+= '<img src="/images/' + images[colorCount] + '.png" />'
					    	projectsHtml+= '<h2>' + projectAreas[colorCount].projectAreaName + '</h2>'
					    	projectsHtml+='</div>';
							projectsHtml+='</div>';
							projectsHtml+='</div>';
							projectsHtml+='</a>'
					    	projectsHtml+='</div>';
						}

					    productCount = productCount + 1;
					    colorCount = colorCount + 1;

						if((productCount) % 4 == 0)
						{
							projectsHtml+= '</div>';
						}
					}
				}



			});

			projectsHtml+= '</div>';

			$('#projectsList').html(projectsHtml);

		});

	});

});

function displayhover(element)
{
	$(element).find(".popupheader").stop().slideToggle();
	$(element).find(".popupdesc").stop().slideToggle();
}

function hidehover(element)
{
	$(element).find(".popupheader").stop().slideToggle();
	$(element).find(".popupdesc").stop().slideToggle();
}