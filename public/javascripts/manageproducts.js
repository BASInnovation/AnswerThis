$( document ).ready(function() {
            
	populateProductsTable();

});

function populateProductsTable()
{
		var tableContent = ''

		$.getJSON('/products/productlist', function(data) {
		$.each(data, function() {
            tableContent += '<tr>';
            
            tableContent += '<td><a href="/products/edit/' + this._id + '">' + this.productName + '</a></td>'
            tableContent += '<td>' + this.productPM + '</td>';
            tableContent += '<td>' + this.productTech + '</td>';
            tableContent += '<td>' + this.productDemo + '</td>';
            
            if(this.featuredProduct)
            {
            	tableContent += '<td style="color:darkgreen"><b>' + this.featuredProduct + '</b></td>';
            }
            else
            {
            	tableContent += '<td style="color:darkred"><b> off </b></td>';
            }
            
            
            tableContent += '<td><a onclick="deleteProduct(\'' + this._id + '\')" class="pointer">Delete</a></td>';
			tableContent += '</tr>';
		});

		$('#productList tbody').html(tableContent);
	});
}

function deleteProduct(productId) {

	$.ajax({
		type: 'DELETE',
		url: '/products/deleteproduct/' + productId
	}).done(function( response ) {

		//Check for a successful (blank) response
		if (response.msg === '') {

			populateProductsTable();
		}
		else {
			alert('Error: ' + response.msg);
		}

		
	});

};