$( document ).ready(function() {
            
	populateDepartmentTable();

});

function populateDepartmentTable()
{
	var tableContent = ''

	$.getJSON('/departments/departmentlist', function(data) {
		console.log(data);

		$.each(data, function() {
            tableContent += '<tr>';
            
            tableContent += '<td><a href="/departments/edit/' + this._id + '">' + this.departmentName + '</a></td>'
            tableContent += '<td>' + this.departmentManager + '</td>';
            tableContent += '<td>' + this.departmentDescription + '</td>';
            tableContent += '<td><a onclick="deleteDepartment(\'' + this._id + '\')" class="pointer">Delete</a></td>';
			tableContent += '</tr>';
		});

		$('#departmentList tbody').html(tableContent);
	});
}

function deleteDepartment(departmentId) {

	$.ajax({
		type: 'DELETE',
		url: '/departments/deletedepartment/' + departmentId
	}).done(function( response ) {

		//Check for a successful (blank) response
		if (response.msg === '') {

			populateDepartmentTable();
		}
		else {
			alert('Error: ' + response.msg);
		}

		
	});

};