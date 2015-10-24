$( document ).ready(function() {
	$('#nav').show();
	if(Role == 'admin')
	{
		$('#addUser').show();
		$('#addProject').show();
		$('#addDepartments').show();
		$('#addPeople').show();
		$('#addProjectArea').show();

	}
	else if(Role == 'contribute')
	{
		$('#addProject').show();
		$('#addProjectArea').show();

	}
});