$( document ).ready(function() {


	var projectAreaID = $('#projectAreaId').val();

	$.getJSON('/projectareas/getprojectarea/' + projectAreaID, function(data) {
		
		$.each(data, function() {

            $('#projectAreaName').val(this.projectAreaName);
            $('#projectAreaManager').val(this.projectAreaManager);
            $('#projectAreaDescription').val(this.projectAreaDescription);

		});

	});

});