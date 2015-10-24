$( document ).ready(function() {


	var projectsHtml = ''

	$.getJSON('/departments/departmentlist', function(data) {
		
		var productCount = 0;

		$.each(data, function() {
            if (productCount % 3 == 0) 
			{
				projectsHtml+= '<div class="row">';
			}

		    projectsHtml+= '<div class="4u">';
		    projectsHtml+= '<section class="box feature">';
		    projectsHtml+= '<a href="/department/' + this._id + '" class="image featured"><img src="images/project.jpg" alt="" /></a>';
		    projectsHtml+= '<div class="inner">';
		    projectsHtml+= '<header>';
		    projectsHtml+= '<h2>' + this.departmentName + '</h2>';
		    projectsHtml+= '<p>' + this.departmentManager + '</p>';
		    projectsHtml+= '</header>';
		    projectsHtml+= '<p>' + /*this.productDescription*/ + '</p>';
		    projectsHtml+= '<br>';
		    projectsHtml+= '<a href="/department/' + this._id + '" class="button icon fa-arrow-circle-right">View Department</a>';
		    projectsHtml+= '</div>';
		    projectsHtml+= '</section>';

		    projectsHtml+='</div>';

		    productCount = productCount + 1;

			if (productCount % 3 == 0)
			{
				projectsHtml+= '</div>';
			}

		});

		$('#departmentList').html(projectsHtml);

	});

});