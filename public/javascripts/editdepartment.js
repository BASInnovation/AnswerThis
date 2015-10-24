$( document ).ready(function() {


	var departmentID = $('#departmentId').val();

	$.getJSON('/departments/getdepartment/' + departmentID, function(data) {
		
		$.each(data, function() {

            $('#departmentName').val(this.departmentName);
            $('#departmentManager').val(this.departmentManager);
            $('#departmentDescription').val(this.departmentDescription);

		});

	});

});