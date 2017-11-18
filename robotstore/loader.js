var load;
var isLoading = true;
function loaded() {
    //load = setTimeout(showPage, 500);
}

function showPage() {
  isLoading = false;
  document.getElementById("loader").style.display = "none";
  document.getElementById("page").style.display = "block";
}
function loading() {
    let i = 1;
    while (isLoading) {
        if (i === 1) {
            document.getElementById("loadmessage").innerHTML = "MR ROBOT LOADING.";
        }
        else if (i === 2) {
            document.getElementById("loadmessage").innerHTML = "MR ROBOT LOADING..";
        }
        else {
            document.getElementById("loadmessage").innerHTML = "MR ROBOT LOADING...";
            i = 0;
        }
        i++;
    }
}
