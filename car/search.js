//search filter function
  $('#searchbox').change(function() {
    let search = document.getElementById("searchbox").value;
    if (search.match(/dog|R.E.T|ret|E.T.|ET|pet/i) ) {
      $('#robo1').removeClass('invisible');
      $('#robo2').addClass('invisible');
      $('#robo3').addClass('invisible');
      
    }
    else if (search.match(/butler|martini|chore|housework/i) ) {
      $('#robo2').removeClass('invisible');
      $('#robo1').addClass('invisible');
      $('#robo3').addClass('invisible');
    }
    else if (search.match(/mega|man|freind|companion/i) ) {
      $('#robo3').removeClass('invisible');
      $('#robo1').addClass('invisible');
      $('#robo2').addClass('invisible');
    }
    else {
      for (let i = 0; i < highlightAreas.length; i++) {
        $('#robo1').removeClass('invisible');
        $('#robo2').removeClass('invisible');
        $('#robo3').removeClass('invisible');
      }
    }
  });
