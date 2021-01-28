
window.onload = function() {

//header 
         
// product image slider show
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var slideIndex = 1;

prev.addEventListener('click', plusSlides, false);
next.addEventListener('click', plusSlides, false);

function plusSlides(n) {
    if(n = 1) {
    showSlides(slideIndex += n);
    } else {
    showSlides(slideIndex -= n);
    }
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides");
 
  if (n > slides.length) {
  		slideIndex = 1;
  }
  
  if (n < 1) {
  		slideIndex = slides.length;
  }
  
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
 
  slides[slideIndex-1].style.display = "block";  
}

showSlides(slideIndex);

// price
$("select").change(function() { 
	var individualPrice = '$499';
    var groupPrice = '$749'; 

    $("option").each(function() {
      if($('option:selected').data('price') == 749) {
        $('#price').html(groupPrice);
      } else {
        $('#price').html(individualPrice);
      }
    });

});

// volumn function
$(".increase").click(function() {
	var counter = 1; 
    var $increase = $('#plus').text();
    var oldValue = $(this).closest("div.volumn").find("input").val();
		if ($increase == "+") {
    		counter = parseFloat(oldValue) + 1;
        }
    $(this).closest("div.volumn").find("input").val(counter);
});

$(".decrease").click(function() {
	var counter = 1;
    var $decrease = $('#minus').text();
    var oldValue = $(this).closest("div.volumn").find("input").val();
   	if($decrease == '-') {
    	counter = parseFloat(oldValue) - 1;
    }
    if(oldValue <= 0 || isNaN(oldValue)){
        counter = 1;
    }
   $(this).closest("div.volumn").find("input").val(counter);
})




///star rating
$('.stars a').on('click', function() {
  $('.stars span, .stars a').removeClass('active');

  $(this).addClass('active');
  $('.stars span').addClass('active');
});

// how it works
$('div.instruction #trigger').click(function() {
		$( "p.instr-description" ).toggle();
});


}

