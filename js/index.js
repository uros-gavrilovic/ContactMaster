$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

  function vh(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
  }
  
  function vw(v) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
  }

  function rgb(r,g,b) {
    return 'rgb(' + [(r||0),(g||0),(b||0)].join(',') + ')';
}
  window.onscroll = function() {onScroll()};
  function onScroll() {
    let scrollHeight = document.body.scrollTop;
    
    let element = document.getElementById("learnMorePt2IdStandard");
    let elementHeight = element.offsetHeight;
    console.log("Element height: " + elementHeight + "\nCurrent height: " + scrollHeight);

    if(scrollHeight <= elementHeight){
        console.log("a");
        document.body.style.backgroundAttachment = "";
    } else {
        console.log("b");
        document.body.style.backgroundAttachment = "local";
        document.body.style.backgroundSize="auto"
        document.body.style.backgroundColor= rgb(254,220,50);
        // document.body.style.objectFit = "cover";
    }
  }