function Validate(){ 	
	var validateStatus=true;
	$('.toValidate').each(function(index) {
		var validateField=$(this);
		var chkstatus=true;
        var getchkname=$(validateField).attr("name");
       
 //       var chknameArray=getchkname.split('.');
  //      var chkname=chknameArray[0];

        var dataType;
		if($.trim(($("input[name='"+getchkname+"_mandatory']")).length>0) && ($.trim($("input[name='"+getchkname+"_mandatory']").val())=="M") ){
	        dataType=$("input[name='"+getchkname+"_fieldType']").val();
            chkstatus=checkType(dataType,validateField,"mandatory");			
		}else{		
			dataType=$("input[name='"+getchkname+"_fieldType']").val();
            chkstatus=checkType(dataType,validateField,"notmandatory");            
		}
		
		if(!chkstatus){
		//	showError(validateField,getErrorMsg(dataType));
		    validateStatus=false;
			return validateStatus;
		}
	});
	return validateStatus;
}

function showError(field,errorMsg){
	var defaultErrorMsg=errorMsg;
	$('.message').remove();
	
	/*error box added*/
	   //var imgRight = $(field).offset().left-10 ;
	   //var imgTop = $(field).offset().top-4;
	var position = $(field).position();
	var imgRight = Math.floor(position.left)+Math.floor($(field).css('width').replace('px',''))+4 ;
	var imgTop = position.top-4;
	if($(field).hasClass('valSelect')){
		   //var msgStyle=style="color:red;position:absolute;display:inline;";
		   var msgStyle='style="color:red;position:absolute;top:'+imgTop+';right:'+imgRight+';zIndex:5000"';

		$(field).after('<span class="message messageErrors">Please Select Data</span>');
	}else{
		$(field).after('<span class="message messageErrors">'+defaultErrorMsg+'</span>');
	}	

	$('.messageErrors').css({
      top: imgTop,
      left: imgRight
    });
	/*error box added*/	
	
	/*
	if($(field).hasClass('valSelect')){
		$(field).after('<span class="message" style="color: red;">Please Select Data</span>');
	}else{
		$(field).after('<span class="message" style="color: red;">'+defaultErrorMsg+'</span>');
	}
	*/
	
	$('.message').hide();
	$('.message').show('slow').delay(5000).hide('slow');
 //   $(field).focus();
	
}

function getErrorMsg(dataType){
	var defaultMsg="Please enter data.";
    switch (dataType)
    {
    case "INTEGER":       
    	defaultMsg="Please enter an integer.";
      break;
    case "STRING":              
    	defaultMsg="Please enter a string.";
      break;
 case "ADDRESS":              
    	defaultMsg="Please enter the address.";
      break;
    case "FLOAT":
    	defaultMsg="Please enter a float value.";       
      break;
    case "DOUBLE":
    	defaultMsg="Please enter a double value.";       
      break;
    case "DATE":
    	defaultMsg="Please select a date.";       
      break;
    case "VARCHAR":
    	defaultMsg="Please enter a varchar.";       
       break;
    case "CHECKBOX":
    	defaultMsg="Please select a checkbox.";       
       break;
     case "MOBILE":
    	 defaultMsg="Please enter a mobile no.";       
       break;
     case "LANDLINE":
    	 defaultMsg="Please enter your landline no.";      
       break;
     case "PANCARD":
    	 defaultMsg="Please enter your pancard no.";       
       break;
     case "EMAIL":
    	 defaultMsg="Please enter your email address.";       
       break;
     case "CASH":
    	 defaultMsg="Please enter a cash amount greater then or equal to 1 lakh.";       
       break;
     case "LOAN":
    	 defaultMsg="Please enter a loan amount greater then or equal to 80 thousand.";       
       break;
     case "CUSTID":
    	 defaultMsg="Please enter customer ID.";       
       break;
     case "TENOR_YEAR":
    	 defaultMsg="Please enter Tenor Year.";       
       break; 
     case "TENOR_MONTH":
    	 defaultMsg="Please enter Tenor Month.";       
       break; 
     case "TENOR_DAY":
    	 defaultMsg="Please enter Tenor Day.";       
       break; 
    }
   
    return defaultMsg;
}

function ValidateForm(){
//	alert("in ValidateForm ");
	var isValid=true;	
	isValid = Validate(); // form validation returning true or false
		
	return isValid;                
}

function ValidateSingleForm(formId){
//	alert("in ValidateForm ");
	var isValid=true;	
	isValid = ValidateSingle(formId); // form validation returning true or false
		
	return isValid;                
}

function ValidateSingle(formId){
//	alert("formId :"+formId);
	var validateStatus=true;
	$('#'+formId+' .toValidate').each(function(index) {
		var validateField=$(this);
		var chkstatus=true;
        var getchkname=$(validateField).attr("name");
       
 //       var chknameArray=getchkname.split('.');
  //      var chkname=chknameArray[0];

        var dataType;
		if($.trim(($("input[name='"+getchkname+"_mandatory']")).length>0) && ($.trim($("input[name='"+getchkname+"_mandatory']").val())=="M") ){
	        dataType=$("input[name='"+getchkname+"_fieldType']").val();
            chkstatus=checkType(dataType,validateField,"mandatory");			
		}else{		
			dataType=$("input[name='"+getchkname+"_fieldType']").val();
            chkstatus=checkType(dataType,validateField,"notmandatory");            
		}
		
		if(!chkstatus){
		//	showError(validateField,getErrorMsg(dataType));
		    validateStatus=false;
			return validateStatus;
		}
	});
	return validateStatus;
}

$('.toValidate').live('blur',function(){ //This is written to handel validation on tabing from one filed to another.
	var validateField=$(this); 
	var chkstatus=true;
    var getchkname=$(validateField).attr("name");
 //   var chknameArray=getchkname.split('.');
//    var chkname=chknameArray[0];
	var dataType;
	if($.trim(($("input[name='"+getchkname+"_mandatory']")).length>0) && ($.trim($("input[name='"+getchkname+"_mandatory']").val())=="M") ){
		dataType=$("input[name='"+getchkname+"_fieldType']").val();
        chkstatus=checkType(dataType,validateField,"mandatory");			
	}else{	
		dataType=$("input[name='"+getchkname+"_fieldType']").val();
        chkstatus=checkType(dataType,validateField,"notmandatory");            
	}

});

function checkType(dataType,inputTag,mandatoryCheck){
    fieldStatus=true;
    switch (dataType)
    {
    case "INTEGER":       
        fieldStatus=isInteger(inputTag,mandatoryCheck);
      break;
    case "STRING":
        if($(inputTag).hasClass("textValidate")){               
            fieldStatus=isString(inputTag,mandatoryCheck);
        }else{               
            fieldStatus=isStringWithoutSpecialChars(inputTag,mandatoryCheck);
        }
      break;
    case "FLOAT":
        fieldStatus=isDouble(inputTag,mandatoryCheck);       
      break;
    case "DOUBLE":
        fieldStatus=isDouble(inputTag,mandatoryCheck);       
      break;
    case "DATE":
        fieldStatus=isDate(inputTag,mandatoryCheck);       
      break;
    case "VARCHAR":
        fieldStatus=isString(inputTag,mandatoryCheck);       
      break;
    case "MOBILE":
        fieldStatus=isMobile(inputTag,mandatoryCheck);       
      break;
    case "CHECKBOX":
        fieldStatus=isCheckbox(inputTag,mandatoryCheck);       
      break;
    case "LANDLINE":
        fieldStatus=isLandline(inputTag,mandatoryCheck);       
      break;
    case "PANCARD":
        fieldStatus=isPancard(inputTag,mandatoryCheck);       
      break;
    case "EMAIL":
        fieldStatus=isEmail(inputTag,mandatoryCheck);       
      break;
    case "LOAN":
        fieldStatus=isLoan(inputTag,mandatoryCheck);       
      break;
    case "CASH":
        fieldStatus=isCash(inputTag,mandatoryCheck);       
      break;
    case "CUSTID":
    	
        fieldStatus=isCustId(inputTag,mandatoryCheck);       
      break;  
    case "TENOR_YEAR":
    
        fieldStatus=isTenorYear(inputTag,mandatoryCheck);       
      break;
    case "TENOR_MONTH":
    	
        fieldStatus=isTenorMonth(inputTag,mandatoryCheck);       
      break;
    case "TENOR_DAY":
    	
        fieldStatus=isTenorDay(inputTag,mandatoryCheck);       
      break;
case "ADDRESS":
    	
        fieldStatus=isAddress(inputTag,mandatoryCheck);       
      break;
      
    }
   
    return fieldStatus;
}





function isAddress(f,mandatoryCheck) {
	 var val=$(f).val();
   var isValid = true;
   var string=val.length;
   if (val.match(/[^_\W]/) && val.match(/[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]/))
	   {
	   
	    isValid = true;
	   }
   if(mandatoryCheck=="mandatory" && string<=0){
	    //    var getLabel=$(f).parent().prev().children(":first").text();
	    	showError(f,' Please enter data.');
	   //     msg.push(getLabel+" Please enter data");
	        isValid = false;

	    }
  
   return isValid;
}
function isTenorYear(f,mandatoryCheck) {
	 var val=$.trim($(f).val());
    var isValid = true;
     if (isNaN(val) ) {
       	 showError(f,"Please enter integer only.");
       	 isValid = false;
       }
    else{
        isValid = true;
    }
   
    return isValid;
}

function isTenorMonth(f,mandatoryCheck) {
	 var val=$.trim($(f).val());
    var isValid = true;
   
     if(val.length<1){
 	   showError(f,"Please enter proper value.");
 	  isValid = false;
    }
     else if (isNaN(val) ) {
    	 showError(f,"Please enter integer only.");
    	 isValid = false;
    }
     else{
         isValid = true;
     }
     
    return isValid;
}

function isTenorDay(f,mandatoryCheck) {
	 var val=$.trim($(f).val());
    var isValid = true;
   
   if(val.length<1){
 	   showError(f,"Please enter proper value.");
 	  isValid = false;
    }  else if (isNaN(val) ) {
    	 showError(f,"Please enter integer only.");
    	 isValid = false;
    }
    else{
        isValid = true;
    }
    return isValid;
}
function isInteger(n,mandatoryCheck) {
    var val=$.trim($(n).val());
     var isValid = false;
     if(mandatoryCheck=="notmandatory" && val.length<=0){
         isValid = true;
     }
     else if (isNaN(val) || !(parseFloat(val) == parseInt(val,10))  ){
     //   var getLabel=$(n).parent().prev().children(":first").text();
    	 showError(n,"Please enter an integer.");
        //alert(" Please enter an integer.");
     //   msg.push(getLabel+" Please enter an integer.");
       
    }else{
        isValid = true;
    }
       
    return isValid;
}

function isDouble(f,mandatoryCheck) {
    var val=$(f).val();
    var isValid = false;
    if(mandatoryCheck=="notmandatory" && val.length<=0){
         isValid = true;
     }
    else if (isNaN(val) || isNaN ( parseFloat ( val ))) {
    	showError(f,"Please enter a double value.");
    //  var getLabel=$(f).parent().prev().children(":first").text();
        //alert(getLabel+' no special characters allowed');
     //   msg.push(getLabel+" Please enter a double value.")

    }else{
        isValid = true;
    }
     
    return isValid;
}

function isString(f,mandatoryCheck) {
    
    var val=$.trim($(f).val());
    var isValid = true;
    var string = val.length;
   //alert("value.length "+val.length);
    var iChars = "";
    for (var i = 0; i < string; i++) {
        if (iChars.indexOf(val.charAt(i)) != -1){
            isValid = false;   
        }   
    }
    if (isValid == false)
    {
       // var getLabel=$(f).parent().prev().children(":first").text();
    	showError(f,' No special characters allowed.');
      //  msg.push(getLabel+" no special characters allowed");
    }
    if(mandatoryCheck=="mandatory" && string<=0){
    //    var getLabel=$(f).parent().prev().children(":first").text();
    	showError(f,' Please enter data.');
   //     msg.push(getLabel+" Please enter data");
        isValid = false;

    }
    return isValid;
}

function isStringWithoutSpecialChars(f,mandatoryCheck) {
   
    var val=$.trim($(f).val());
    var isValid = true;
    var string = val.length;
   
    var iChars = "*|,\":<>[]{}`\';()@&$#%!";
    for (var i = 0; i < string; i++) {
        if (iChars.indexOf(val.charAt(i)) != -1){
            isValid = false;   
        }   
    }
    if (isValid == false)
    {
     //   var getLabel=$(f).parent().prev().children(":first").text();
    	showError(f,' no special characters allowed.');
     //   msg.push(getLabel+" no special characters allowed");
    }
    if(mandatoryCheck=="mandatory" && string<=0){
    //    var getLabel=$(f).parent().prev().children(":first").text();
    	showError(f,' Please enter data');
   //     msg.push(getLabel+" Please enter data");
        isValid = false;

    }
    return isValid;
}

function isDate(f,mandatoryCheck) {
	
    var value=$.trim($(f).val());
    if(mandatoryCheck=="notmandatory" && value.length<=0){
    	
        return true;
    }else{
        try {
        	
            //Change the below values to determine which format of date you wish to check. It is set to dd/mm/yyyy by default.
            var DayIndex = 0;
            var MonthIndex = 1;
            var YearIndex = 2;
     
            value = value.replace("/", "-").replace(".", "-");
            value = value.replace("/", "-").replace(".", "-");
            var SplitValue = value.split("-");
            var OK = true;
            if (!(SplitValue[DayIndex].length == 1 || SplitValue[DayIndex].length == 2)) {
                OK = false;
                var getLabel=$(f).parent().prev().children(":first").text();
                //alert(getLabel+'Please Enter Date');
                //msg.push(getLabel+" Please Enter Date");
                
                showError(f,' Please select a date.');
            }
            if (OK && !(SplitValue[MonthIndex].length == 1 || SplitValue[MonthIndex].length == 2)) {
                OK = false;
                var getLabel=$(f).parent().prev().children(":first").text();
                //alert(getLabel+' Please Enter Date');
               // msg.push(getLabel+" Please Enter Date");
               
                showError(f,' Please select a date.');
            }
            if (OK && SplitValue[YearIndex].length != 4) {
                OK = false;
                var getLabel=$(f).parent().prev().children(":first").text();
                //alert(getLabel+' Please Enter Date');
               // msg.push(getLabel+" Please Enter Date");
                alert("inside try3");
                showError(f,' Please select a date.');
            }
            if (OK) {
                var Day = parseInt(SplitValue[DayIndex], 10);
                var Month = parseInt(SplitValue[MonthIndex], 10);
                var Year = parseInt(SplitValue[YearIndex], 10);
     
                if (OK = (Year > 1900)) {
                    if (OK = (Month <= 12 && Month > 0)) {
                        var LeapYear = (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0));
     
                        if (Month == 2) {
                            OK = LeapYear ? Day <= 29 : Day <= 28;
                        }
                        else {
                            if ((Month == 4) || (Month == 6) || (Month == 9) || (Month == 11)) {
                                OK = (Day > 0 && Day <= 30);
                            }
                            else {
                                OK = (Day > 0 && Day <= 31);
                            }
                        }
                    }
                }
            }
            return OK;
        }
        catch (e) {
            var getLabel=$(f).parent().prev().children(":first").text();
            //alert(getLabel+' Please Enter Date');
          //  msg.push(getLabel+" Please Enter Date");
            showError(f,' Please select a date.');
            return false;
        }
    }
}

function isCheckbox(f,mandatoryCheck) {
    var val=$(f).attr('name');
    var isValid = false;
    if(mandatoryCheck=="notmandatory"){
         isValid = true;
     }else{
    	    $('input[name="'+val+'"]').each(function(index2, Element){
    	        if($(Element).is(':checked')){
    	        	isValid = true;            
    	        }
    	     });
    	    if(isValid == false){
    	    	showError(f,"Please select a checkbox.");
    	    }
    }
     
    return isValid;
}

function isMobile(f,mandatoryCheck){
    var val=$.trim($(f).val());
    var isValid = false;
    if(mandatoryCheck=="notmandatory" && val.length<=0){
        isValid = true;
    }
    else if (isNaN(val) || !(parseFloat(val) == parseInt(val,10))  ){
    //   var getLabel=$(n).parent().prev().children(":first").text();
   	 showError(f,"Please enter digits only.");
       //alert(" Please enter an integer.");
    //   msg.push(getLabel+" Please enter an integer.");
      
   }else if(val.length<10 || val.length>10){
	   showError(f,"Please enter 10 digits.");
   }else{
       isValid = true;
   }
      
   return isValid;
}

function isLandline(f,mandatoryCheck){
	var val=$.trim($(f).val());
    var isValid = false;
    if(mandatoryCheck=="notmandatory" && val.length<=0){
        isValid = true;
    }
    else if (isNaN(val) || !(parseFloat(val) == parseInt(val,10))  ){
    //   var getLabel=$(n).parent().prev().children(":first").text();
   	 showError(f,"Please enter digits only.");
       //alert(" Please enter an integer.");
    //   msg.push(getLabel+" Please enter an integer.");
      
   }else if(val.length<10 || val.lenght == 11 || val.lenght > 12){
	   showError(f,"Please enter 10 digits.");
   }else{
       isValid = true;
   }
      
   return isValid;
}

function isPancard(f,mandatoryCheck){
	var val=$.trim($(f).val());
	var regex = /^[A-Z]{3}[G|A|F|C|T|H|P]{1}[A-Z]{1}\d{4}[A-Z]{1}$/;
	var isValid = false;
    if(mandatoryCheck=="notmandatory" && val.length<=0){
        isValid = true;
    }else if(val.length<10 || val.length > 10){
	   showError(f,"Pan Card no. should be atleast 10 charcters.");
	   
   }else if(!regex.test(val)){
	   showError(f,"Please enter a valid pan card no.");   
   }else{
	   isValid = true;
   }
      
   return isValid;
}

function isEmail(f,mandatoryCheck){
	var val=$.trim($(f).val());
	var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var isValid = false;
    if(mandatoryCheck=="notmandatory" && val.length<=0){
        isValid = true;
    }else if(!regex.test(val)){
	   showError(f,"Please enter a valid email.");
	   
   }else{
	   isValid = true;
   }
      
   return isValid;
}

function isCash(f,mandatoryCheck){
	var val=$.trim($(f).val());
//	alert(regex.equals(val));
//	var regex = 100000;
	var isValid = false;
    if(mandatoryCheck=="notmandatory" && val.length<=0){
        isValid = true;
    }else if (isNaN(val) || !(parseFloat(val) == parseInt(val,10))  ){
        //   var getLabel=$(n).parent().prev().children(":first").text();
   	 showError(f,"Please enter an integer.");
       //alert(" Please enter an integer.");
    //   msg.push(getLabel+" Please enter an integer.");
      
   }else if(val < 100000){
	   showError(f,"Please enter amount greater then 1 lakh.");
	   
   }else{
	   isValid = true;
   }
      
   return isValid;
}

function isLoan(f,mandatoryCheck){
	var val=$.trim($(f).val());
//	var regex = 80000;
	var isValid = false;
    if(mandatoryCheck=="notmandatory" && val.length<=0){
        isValid = true;
    }else if (isNaN(val) || !(parseFloat(val) == parseInt(val,10))  ){
        //   var getLabel=$(n).parent().prev().children(":first").text();
   	 showError(f,"Please enter an integer.");
       //alert(" Please enter an integer.");
    //   msg.push(getLabel+" Please enter an integer.");
      
   }else if(val < 80000){
	   showError(f,"Please enter amount greater then 80 Thousand.");
	   
   }else{
	   isValid = true;
   }
   
}
//function for checking cust id in shARE ACC
function isCustId(f,mandatoryCheck){
	
	var val=$.trim($(f).val());
	
//	var regex = 80000;
	var isValid = false;
    if(mandatoryCheck=="notmandatory" && val.length<=0){
        isValid = true;
    }else if (isNaN(val) || !(parseFloat(val) == parseInt(val,10))  ){
        //   var getLabel=$(n).parent().prev().children(":first").text();
   	 showError(f,"Please enter an integer.");
       //alert(" Please enter an integer.");
    //   msg.push(getLabel+" Please enter an integer.");
      
   }else if(val.length < 17){
	   showError(f,"Customer ID should be of 17 digits.");
	   
   }else{
	   isValid = true;
   }    
  
    return isValid;
}
