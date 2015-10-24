$( document ).ready(function() {


	var productID = $('#productId').val();

	$.getJSON('/products/getproduct/' + productID, function(data) {
		
		$.each(data, function() {
			$('#productPM').html(this.productPM);
			$('#productTech').html(this.productTech);
			$('#productDemo').html(this.productDemo);
			$('#productReferences').html(this.productReferences);
			$('#productVideo1').attr('src',this.productVideo1.replace('watch?v=','embed/'));
			$('#productVideo2').attr('src',this.productVideo2.replace('watch?v=','embed/'));
			$('#productVideo3').attr('src',this.productVideo3.replace('watch?v=','embed/'));
			$('#productImage').attr('src',this.mainImageUrl);
			$('#subImage1').attr('src',this.subImage1Url);
			$('#subImage2').attr('src',this.subImage2Url);
			$('#subImage3').attr('src',this.subImage3Url);
			$('#subImage1Label').html(this.subImage1Label);
			$('#subImage2Label').html(this.subImage2Label);
			$('#subImage3Label').html(this.subImage3Label);
			$('#productName').html(this.productName);
			$('#productStrapLine').html(this.productStrapLine);
			$('#productDescription').html(this.productDescription);
			$('#mainImageLabel').html(this.mainImageLabel);
		});

	});

});

function ChangeImage(id)
{
	console.log($('#' + id));

	var mainImageUrl = $('#productImage').attr('src');
	var mainImageLabel = $('#mainImageLabel').html();
	var selectedImageUrl = $('#' + id).attr('src');
	var selectedImageLabel = $('#' + id + 'Label').html();

	$('#productImage').fadeOut('fast','swing');
	$('#' + id).fadeOut('fast','swing');

	$('#productImage').attr('src',selectedImageUrl);
	$('#mainImageLabel').html(selectedImageLabel);
	$('#' + id).attr('src',mainImageUrl);
	$('#' + id + 'Label').html(mainImageLabel);

	$('#productImage').fadeIn('fast','swing');
	$('#' + id).fadeIn('fast','swing');
}