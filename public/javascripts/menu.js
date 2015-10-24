$( document ).ready(function() {

	var projectsHtml = '';
	var peopleHtml = '';
	var departments = [];
	var people = [];

	$.getJSON('/products/productlist', function(data) {
		$.each(data, function() {
            projectsHtml+= '<li><a href="/products/' + this._id + '")>' + this.productName + '</a></li>';
		});

		$('#productsMenu').html(projectsHtml);

		/*$('#navigation').slimmenu(
		{
		    resizeWidth: '800',
		    collapserTitle: 'Main Menu',
		    animSpeed: 'medium',
		    easingEffect: null,
		    indentChildren: false,
		    childrenIndenter: '&nbsp;'
		});*/

		/*$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			speed: 300
		});*/
	});

	$.getJSON('/departments/departmentlist', function(data) {
		departments = data;

		$.getJSON('/people/personlist', function(data2) {
			people = data2

			$.each(departments, function() {
				var departmentName = this.departmentName
				peopleHtml+= '<li><a href="/department/' + this._id + '")>' + departmentName;
				
				var personcount = 0;
				$.each(people, function() {
					
					if(this.department == departmentName)
					{
						personcount += 1;
					}

				});

				if(personcount > 0)
				{
					peopleHtml+= '<span class="caret"></span></a><ul class="dropdown-menu">'
					
					$.each(people, function() {
						
						if(this.department == departmentName)
						{
							peopleHtml+= '<li><a href="/people/' + this._id + '")>' + this.forename + ' ' + this.surname +'</a></li>';
						}


					});

					peopleHtml+= '</ul></li>'
				}
				else
				{
					peopleHtml+= '</a></li>'
				}

			});

			$('#peopleMenu').html(peopleHtml);

			/*$('#nav').slimmenu(
			{
			    resizeWidth: '800',
			    collapserTitle: 'Main Menu',
			    animSpeed: 'medium',
			    easingEffect: null,
			    indentChildren: false,
			    childrenIndenter: '&nbsp;'
			});*/

			/*$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				speed: 300
			});*/

			$.getScript('/javascripts/jquery.smartmenus.min.js');
			$.getScript('/javascripts/jquery.smartmenus.bootstrap.min.js');

			/*var script = document.createElement('script');
			script.src = "/javascripts/jquery.smartmenus.js";
			
			var script2 = document.createElement('script');
			script2.src = "/javascripts/jquery.smartmenus.bootstrap.js";

			document.getElementsByTagName('head')[0].appendChild(script);
			document.getElementsByTagName('head')[0].appendChild(script2);*/


		});

	});

});
