$( document ).ready(function() {


	var projectsHtml = ''
	var departmentID = $('#departmentId').val();

	$.getJSON('/departments/getdepartment/' + departmentID, function(data) {
		
		var productCount = 0;

		$.each(data, function() {
            
			$('#departmentName').html(this.departmentName);
			$('#departmentDescription').html(this.departmentDescription);
			$('#departmentManager').html(this.departmentManager);

			$.getJSON('/people/personlist/' + this.departmentName, function(data2) {
				
				$.each(data2, function() {
					if (productCount % 3 == 0) 
					{
						projectsHtml+= '<div class="row">';
					}

				    projectsHtml+= '<div class="4u">';
				    projectsHtml+= '<section class="box feature">';
				    projectsHtml+= '<a href="/people/' + this._id + '" class="image featured"><img src="' + this.imageurl + '" alt="" /></a>';
				    projectsHtml+= '<div class="inner">';
				    projectsHtml+= '<header>';
				    projectsHtml+= '<h2>' + this.forename + ' ' + this.surname +'</h2>';
				    projectsHtml+= '<p>' + this.lineManager + '</p>';
				    projectsHtml+= '</header>';
				    projectsHtml+= '<p>' + + '</p>';
				    projectsHtml+= '<br>';
				    projectsHtml+= '<a href="/people/' + this._id + '" class="button icon fa-arrow-circle-right">View Person</a>';
				    projectsHtml+= '</div>';
				    projectsHtml+= '</section>';

				    projectsHtml+='</div>';

				    productCount = productCount + 1;

					if (productCount % 3 == 0)
					{
						projectsHtml+= '</div>';
					}
				});
			
				$('#peopleList').html(projectsHtml);
			});
            
		});

	});

});