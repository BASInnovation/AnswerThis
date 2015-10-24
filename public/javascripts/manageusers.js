$( document ).ready(function() {
            
	populateUserTable();

});

function populateUserTable()
{
	var tableContent = ''

	$.getJSON('/manageusers/userlist', function(data) {
		$.each(data, function() {
            tableContent += '<tr>';
            
            tableContent += '<td>' + this.username + '</td>'
            tableContent += '<td>' + this.firstName + '</td>';
            tableContent += '<td>' + this.lastName + '</td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.userRole + '</td>';
            tableContent += '<td><a onclick="deleteUser(\'' + this._id + '\')" class="pointer">Delete</a></td>';
			tableContent += '</tr>';
		});

		$('#userList tbody').html(tableContent);
	});
}

function deleteUser(userId) {

	$.ajax({
		type: 'DELETE',
		url: '/users/deleteuser/' + userId
	}).done(function( response ) {

		//Check for a successful (blank) response
		if (response.msg === '') {

			populateUserTable();
		}
		else {
			alert('Error: ' + response.msg);
		}
		
	});

}