$(function() {
	$('form').keyup(function(e) {
		e.preventDefault();
		$('p').empty();  //clears any previous "this form is invalid" message
  		validateForm();	
	});	 
});  
	
function validateForm () {
	var 	alert = 0,  //flag that form is valid
		//pass in the contents (values) of all 4 fields as parameters
		nameValue =   $('#name').val(),   
		emailValue =   $('#email').val(),
		zipValue =       $('#zipCode').val(),
		phoneValue =  $('#phone').val() ; 
		
	var nameResult = validateName(nameValue) ;
	isFormValid('name', nameResult);
	
	var emailResult = validateEmail(emailValue);
	isFormValid(emailResult);

	if (zipValue != ''){ 
		var zipResult = validateZip (zipValue);
		isFormValid(zipResult);
	}
	if (phoneValue != ''){
		var phoneResult = validatePhone(phoneValue);
		isFormValid(phoneResult);
	}

		
}
 
function isFormValid(field, result) {
	var 	selectorInput = "input." + field,
		selectorLi = "li." + field
	if (result === false) {
		$(selectorInput).removeClass('good');
		$(selectorInput).addClass('bad');
		// $('input').before('<p>bad</p>');
	// $('body').append('<p>This form is invalid!</p>');
	}
	else {
		$(selectorInput).removeClass('bad');
		$(selectorInput).addClass('good');
	}
}

function validateName (nameValue) {
 	for (i =0; i < nameValue.length; i++) {
 		var utf8 = nameValue[i].charCodeAt();
 		if (!((utf8 > 64 && utf8 <91) 
		|| (utf8 > 96 && utf8 < 123))) {
 			return false;
 		}		
	}
	return true;
}

function validateEmail (emailValue) {
	var 	indexofAtSign = emailValue.indexOf('@'),
		lastDot = emailValue.lastIndexOf('.');  //in case of mult dots and one comes before the '@'';
	if (
		indexofAtSign > 0
		&& lastDot > indexofAtSign 
		&& isChar(emailValue.charCodeAt(lastDot - 1))
		&& isChar(emailValue.charCodeAt(lastDot + 1))
		&& isChar(emailValue.charCodeAt(lastDot + 2)) 
		&& isChar(emailValue.charCodeAt(lastDot + 3)) 
		) {
		return true;
	}
	else {
		return false;
	}
}
	
function isChar (charCode) {
	if((charCode > 47 && charCode < 58) || (charCode > 64 && charCode <91) 
		|| (charCode > 96 && charCode < 123)) {
		return true
	}
	return false;
}

// validate Zip: 5 digits
function validateZip (zipValue) {
	
	for (i=0; i < 5; i++) {
		 if ( (zipValue.charCodeAt(i) > 47  && zipValue.charCodeAt(i) < 58)) {
		 }
		 else {
		 	return false;
		 }
	}
}

// validate Phone: 10 digits, with or without dashes.
function validatePhone (phoneValue) {
	for (i=0; i < 3; i++) {    //check that 1st three are digits
		 if (!(phoneValue.charCodeAt(i) > 47  && phoneValue.charCodeAt(i) < 58)) {
		 	return false;
		 }
	}
	if ( (phoneValue.charCodeAt(3) > 47  && phoneValue.charCodeAt(3) < 58)) {
		console.log(phoneValue[3]);
		//if 4th is a digit, check if the next six are digits (haven't yet prevented an 11th)
		for (i=4; i < 10; i++) {
			 if (!(phoneValue.charCodeAt(i) > 47  && phoneValue.charCodeAt(i) < 58)) {
			 	return false;
			 }
		 }
	 return true;  //no further char testing needed, the entry proven to be 10 digits
	} 
	else {
		if (phoneValue.charCodeAt(3) == 45) {
			// if the 4th is a '-', check if the next three are digits
			for (i=4; i < 7; i++) {
			 	if (!(phoneValue.charCodeAt(i) > 47  && phoneValue.charCodeAt(i) < 58)) {
			 	return false;
			 	}
		 	}
			 if (phoneValue.charCodeAt(7) == 45)	{
			 	// if the 7th is a '-', check if the next four are digits
			 	for (i=8; i < 11; i++) {
				 	if (!(phoneValue.charCodeAt(i) > 47  && phoneValue.charCodeAt(i) < 58)) {
					 	return false;
					 	}
			 	}
  			}
		}
		else {
			return false;	
		}
	}

}




	



