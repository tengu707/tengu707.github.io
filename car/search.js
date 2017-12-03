//search filter function
  $('#searchbox').change(function() {
    // Declare variables
    var input, filter, ul, li, h3, i;
    input = document.getElementById('searchbox');
    filter = input.value.toUpperCase();
    ul = document.getElementById("inventory");
    li = ul.getElementsByTagName('article');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        h3 = li[i].getElementsByTagName("h3")[0];
        if (h3.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
  });
