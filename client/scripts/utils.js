      function textCounter(field,field2,maxlimit)
      {
       var countfield = document.getElementById(field2);
       var numberOfLineBreaks = (field.value.match(/\n/g)||[]).length;
       var characterCount = field.value.length + numberOfLineBreaks;
       if ( characterCount > maxlimit ) {
        field.value = field.value.substring( 0, maxlimit );
        return false;
       } else {
        countfield.value = maxlimit - characterCount;
       }
      }