
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var $streetStr = $('#street').val();
    var $cityStr = $('#city').val();
    var $address = $streetStr + ',' + $cityStr;

    // YOUR CODE GOES HERE!
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + $address + ''; 
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');   


    var topStoriesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + 
        $cityStr + "&sort=newest&api-key=e82157a4c7cd48d68abae0a7452a48aa";
    


    $.getJSON(topStoriesURL, function(data) {
        console.log(data);
        $nytHeaderElem.text('New York Times Articles About' + $cityStr);
        $.each(data.response.docs,function(index,element) {
            $nytElem.append('<li class="article">' + '<a href="'+element.web_url+'">'+element.headline.main+'</a>'+
                '<p>' + element.snippet + '</p>' +
                '</li>');
        });
    });

    $(document).ajaxError(function(event,request,settings) {
        $nytElem.append("<li>Error requesting page " + settings.url + "</li>");
    });

    var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+$cityStr+"&format=json";



    $.ajax({
        url: wikiURL,
        dataType: "jsonp"
    }).done(function(data) {
        $.each(data,function(index,element) {
            $wikiElem.append('<li class="article">' + '<a href= "'+ element.url +'">' + $cityStr + '</a>' +
                '</li>');
        });
    });

    return false;
};

$('#form-container').submit(loadData);
