$("document").ready(function() {
  $(".right").hide()

  var currentSearch = ""
  var input = 1
  getPokemon(input)

  $('#openLidButton').click(
    function() {
        $('#js-flip-1 .card').addClass('flipped');
    })

$('#confirmButton').click(
  function() {
    $('#js-flip-1 .card').removeClass('flipped');
  })


  $("#editButton").click(function() {
    // requires lowercase only
    getPokemon($("input").val().toLowerCase())
  })

  $("#search").keypress(function (e) {
 var key = e.which;
 if(key == 13)  {
   getPokemon($("input").val().toLowerCase())
  }
 })

 $("#dpadRight").click(function() {
   if (input >=721) {
     input = 0;
   }
   getPokemon(input+=1)
 })

 $("#dpadLeft").click(function() {
   if (input <= 1) {
     input = 722;
   }
   getPokemon(input-=1)
 })

 $("#shiftButton").click(function() {
   $("#shiftLight").toggleClass("on")
 })

 $("#capsButton").click(function() {
   $("#capsLight").toggleClass("on")
 })

 var brightness = .1
 $('div#brightnessDown').click(function() {
   if (brightness < .8) {
     brightness += .1
   }
   $('#brightnessOverlay').css('opacity', brightness)
 })

 $('div#brightnessUp').click(function() {
   if (brightness > .1) {
     brightness -= .1
   }
   $('#brightnessOverlay').css('opacity', brightness)
 })

 $('div#monitorSwitch').click(function() {
   if (brightness < 1) {
     brightness = 1
   } else {
     brightness = .1
   }
   $('#brightnessOverlay').css('opacity', brightness)
 })

  $('.blueButton').click(function() {
    console.log('button pressed = ' +  $(this).text())
    currentSearch += $(this).text();
    var currentIDNo = parseInt(currentSearch)
    if (currentIDNo > 721) {
      $('#searchBox').text('Error')
    } else {
    $('#searchBox').text(currentSearch)
  }
  })
})


function getPokemon(input) {
  var url = "http://pokeapi.co/api/v2/pokemon/" + input + "/"
  $.get(url).then (function(data) {
  console.log(data)
  var name = jsUcfirst(data.name)
  var weight = Math.floor(data.weight * 0.22) + "lbs"
  if (data.types.length === 2) {
    var typeOne = jsUcfirst(data.types[0].type.name)
    var typeTwo = jsUcfirst(data.types[1].type.name)
    var type = typeOne + '/' + typeTwo
  }
  if (data.types.length === 1) {
    var typeOne = jsUcfirst(data.types[0].type.name)
    var type = typeOne
  }
  var dmHeight = Math.floor(data.height * 3.93701)
  var feet = Math.floor(dmHeight/12)
  var inches = dmHeight%12
  var height = feet + "' " + inches + '"'
  var sprite = data.sprites.front_default
  input = data.id
  updatePage(name, type, height, weight, sprite)
  })
}



function updatePage(name, type, height, weight, sprite) {
  $('#info1 p').empty()
  $('#info2 p').empty()
  $('#info3 p').empty()
  $('#height p').empty()
  $('#picture').empty()
  $('#info1 p').append(name)
  $('#info2 p').append(weight)
  $('#info3 p').append(type)
  $('#height p').append(height)
  $('#picture').append('<img src="' + sprite + '">')
// }

}

function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
