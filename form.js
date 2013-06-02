$(function() {
	$('form').keyup(function(e) {
		e.preventDefault();
		// Raine: This is selector is too broad, and will inadvertently select all paragraphs on the page.
		// Use ids to identify specific elements to interact with in JS
		$('p').empty();  //clears any previous "this form is invalid" message
  		validateForm();	
	});	 
});  
	
function validateForm () {
	// Raine: This would be more explicit as a boolean (false) rather than 0.
	var 	alert = 0,  //flag that form is valid
		//pass in the contents (values) of all 4 fields as parameters
		nameValue =   $('#name').val(),   
		emailValue =   $('#email').val(),
		zipValue =       $('#zipCode').val(),
		phoneValue =  $('#phone').val() ; 
		
	var nameResult = validateName(nameValue) ;
	isFormValid('name', nameResult);
	
	// Raine: It looks like isFormValid was changed to accept 2 arguments, but the
	// below calls are still only passing one.

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
 
// Raine: The 'is' prefix should be reserved for functions that return true or false.
// I would call this function validateField
function isFormValid(field, result) {
	// Raine: Great idea here to generate the selector dynamically from the given field!
	// I would use an id here. Even more flexible, I would pass in the entire selector or
	// selected element itself. That makes this function more flexible.
	var 	selectorInput = "input." + field,
		selectorLi = "li." + field
	// Raine: A===true can be shortened to A, and A===false can be shortened to !A.
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

// Raine: Doesn't allow spaces
function validateName (nameValue) {
 	for (i =0; i < nameValue.length; i++) {
 		// Raine: charCodeAt takes a single parameter, the index of the character. If you don't pass anything,
 		// it's going to interpret undefined as 0, but you should really pass 0 explicitly. In this case you
 		// can just use nameValue.charCodeAt(i);
 		var utf8 = nameValue[i].charCodeAt();

 		// Raine: This would be easier to understand if it was abstracted into two separate functions, 
 		// isLowerCaseLetter and isUpperCaseLetter. Anything to break apart functionality into small,
 		// meaningful chunks is a good thing.
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

// Raine: validateZip("123456") should return false because it is given too many digits.

// validate Zip: 5 digits
function validateZip (zipValue) {
	
	for (i=0; i < 5; i++) {
		 if ( (zipValue.charCodeAt(i) > 47  && zipValue.charCodeAt(i) < 58)) {
		 }
		 else {
		 	return false;
		 }
	}

	// Raine: If the function makes it this far, it will return undefined! That's not good.
	// Since it's a boolean function, it should always return true or false.
}

// validate Phone: 10 digits, with or without dashes.
function validatePhone (phoneValue) {

	// Raine: Notice how (phoneValue.charCodeAt(i) > 47  && phoneValue.charCodeAt(i) < 58) is repeated 5
	// times in this function? Great opportunity to refactor into a separate function.

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

		// Raine: Return false if the total length of the string is greater than 10.

	 return true;  //no further char testing needed, the entry proven to be 10 digits
	} 
	else {
		// Raine: Same as (phoneValue[3] === '-')
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




	



