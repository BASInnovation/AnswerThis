$( document ).ready(function() {


	var productID = $('#personId').val();
	var departmentHtml = '';

	$.getJSON('/departments/departmentlist/', function(data) {

		departmentHtml+='<option value="" selected disabled>Select Department</option>'
		
		$.each(data, function() {
			departmentHtml+='<option>' + this.departmentName + '</option>'
		});

		$('#department').html(departmentHtml)
	});

	$.getJSON('/people/getperson/' + productID, function(data) {
		
		$.each(data, function() {

            $('#forename').val(this.forename);
            $('#surname').val(this.surname);
            $('#personDescription').val(this.personDescription);
            $('#department').val(this.department);
            $('#lineManager').val(this.lineManager);
            $('#manager').val(this.manager);
            $('#role').val(this.role);
            $('#skills').val(this.skills);
			$('#imageurl').val(this.imageurl);
			$('#userThumbnail').attr('src',this.imageurl);
		});

	});

});