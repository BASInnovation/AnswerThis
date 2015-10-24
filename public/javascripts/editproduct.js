$( document ).ready(function() {


	var productID = $('#productId').val();

	$.getJSON('/products/getproduct/' + productID, function(data) {
		
		console.log(data);

		$.each(data, function() {
			$('#productName').val(this.productName);
			$('#dateCreated').val(this.dateCreated);
			$('#productStrapLine').val(this.productStrapLine);
			$('#productDescription').val(this.productDescription);
			$('#productVideo').val(this.productVideo);
			$('#productPM').val(this.productPM);
			$('#productTech').val(this.productTech);
			$('#productDemo').val(this.productDemo);
			$('#productReferences').val(this.productReferences);
			$('#mainimageurl').val(this.mainImageUrl);
			
			if(this.mainImageUrl != "")
			{
				$('#thumbnail').attr('src',this.mainImageUrl);
			}

			$('#mainimagelabel').val(this.mainImageLabel);
			$('#subImage1Url').val(this.subImage1Url);
			$('#subImage2Url').val(this.subImage2Url);
			$('#subImage3Url').val(this.subImage3Url);
			
			if(this.subImage1Url != "")
			{
				$('#subImage1Thumbnail').attr('src',this.subImage1Url)
			}

			if(this.subImage2Url != "")
			{
				$('#subImage2Thumbnail').attr('src',this.subImage2Url)
			}

			if(this.subImage3Url != "")
			{
				$('#subImage3Thumbnail').attr('src',this.subImage3Url)
			}
			$('#subImage1Label').val(this.subImage1Label);
			$('#subImage2Label').val(this.subImage2Label);
			$('#subImage3Label').val(this.subImage3Label);
			
			$('#productVideo1').val(this.productVideo1);
			$('#productVideo2').val(this.productVideo1);
			$('#productVideo3').val(this.productVideo1);

			if(this.featuredProduct)
			{
				$('#highlightProduct').attr('checked','true');
			}
		});

	});

});

function updateDate()
{
	console.log($('#highlightProduct').is(':checked'));

	if($('#highlightProduct').is(':checked') == true)
	{
		$('#dateCreated').val(new Date().toLocaleString());
	}
}