$( document ).ready(function() {


	var projectsHtml = ''

	$.getJSON('/products/productlist', function(data) {
		
		var productCount = 0;

		$.each(data, function() {
            if (productCount % 3 == 0) 
			{
				projectsHtml+= '<div class="row">';
			}

		    projectsHtml+= '<div class="4u">';
		    projectsHtml+= '<section class="box feature">';
		    projectsHtml+= '<a href="/products/' + this._id + '" class="image featured"><img src="' + this.imageurl + '" alt="" /></a>';
		    projectsHtml+= '<div class="inner">';
		    projectsHtml+= '<header>';
		    projectsHtml+= '<h2>' + this.productName + '</h2>';
		    projectsHtml+= '<p>' + this.productStrapLine + '</p>';
		    projectsHtml+= '</header>';
		    projectsHtml+= '<p>' + this.productDescription + '</p>';
		    projectsHtml+= '<br>';
		    projectsHtml+= '<a href="/products/' + this._id + '" class="button icon fa-arrow-circle-right">View Project</a>';
		    projectsHtml+= '</div>';
		    projectsHtml+= '</section>';

		    projectsHtml+='</div>';

		    productCount = productCount + 1;

			if (productCount % 3 == 0)
			{
				projectsHtml+= '</div>';
			}

		});

		$('#projectsList').html(projectsHtml);

	});

});