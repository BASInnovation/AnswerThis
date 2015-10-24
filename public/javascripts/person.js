$( document ).ready(function() {


	var personID = $('#personId').val();

	$.getJSON('/people/getperson/' + personID, function(data) {
		
		$.each(data, function() {
			$('#department').html(this.department);

			$('#personImage').attr('src', this.imageurl);

			$('#lineManager').html(this.lineManager);
			$('#manager').html(this.manager);
			$('#role').html(this.role);
			$('#skills').html(this.skills);
			$('#personName').html(this.forename + ' ' + this.surname);
			$('#foreName').html(this.forename);
			$('#personDescription').html(this.personDescription);
		});

	});

});