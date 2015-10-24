$( document ).ready(function() {
            
	populatePeopleTable();

});

function populatePeopleTable()
{
	var tableContent = ''

	$.getJSON('/people/personlist', function(data) {
		$.each(data, function() {
            tableContent += '<tr>';
            
            tableContent += '<td><a href="/people/edit/' + this._id + '">' + this.forename + '</a></td>'
            tableContent += '<td>' + this.surname + '</td>';
            tableContent += '<td>' + this.department + '</td>';
            tableContent += '<td>' + this.lineManager + '</td>';
            tableContent += '<td>' + this.manager + '</td>';
            tableContent += '<td>' + this.role + '</td>';
            tableContent += '<td><a onclick="deletePerson(\'' + this._id + '\')" class="pointer">Delete</a></td>';
			tableContent += '</tr>';
		});

		$('#peopleList tbody').html(tableContent);
	});
}

function deletePerson(personId) {

	$.ajax({
		type: 'DELETE',
		url: '/people/deleteperson/' + personId
	}).done(function( response ) {

		//Check for a successful (blank) response
		if (response.msg === '') {

			populatePeopleTable();
		}
		else {
			alert('Error: ' + response.msg);
		}

		
	});

};