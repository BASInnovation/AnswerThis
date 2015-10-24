$( document ).ready(function() {
            
	populateProjectAreaTable();

});

function populateProjectAreaTable()
{
	var tableContent = ''

	$.getJSON('/projectareas/projectarealist', function(data) {
		console.log(data);

		$.each(data, function() {
            tableContent += '<tr>';
            
            tableContent += '<td><a href="/projectareas/edit/' + this._id + '">' + this.projectAreaName + '</a></td>'
            tableContent += '<td>' + this.projectAreaManager + '</td>';
            tableContent += '<td>' + this.projectAreaDescription + '</td>';
            tableContent += '<td><a onclick="deleteProjectArea(\'' + this._id + '\')" class="pointer">Delete</a></td>';
			tableContent += '</tr>';
		});

		$('#projectAreaList tbody').html(tableContent);
	});
}

function deleteProjectArea(projectAreaId) {

	$.ajax({
		type: 'DELETE',
		url: '/projectareas/deleteprojectarea/' + projectAreaId
	}).done(function( response ) {

		//Check for a successful (blank) response
		if (response.msg === '') {

			populateProjectAreaTable();
		}
		else {
			alert('Error: ' + response.msg);
		}

		
	});

};