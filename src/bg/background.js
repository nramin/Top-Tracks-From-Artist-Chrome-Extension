chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

var artist = {};
var topTracks = {};
function getArtist(searchQuery) {
	artist = '';
	$.ajax({
		async: false,
		cache: false,
		type: 'GET',
		url : 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + searchQuery + '&limit=1&api_key=9ecc895dc348c77b4292d651c2169374&format=json',
		dataType: 'json',
		success: function(data) {
			artist = data;
		}
	});
	return artist;
}

function getTopTracks(artist) {
	topTracks = null;
	$.ajax({
		async: false,
		cache: false,
		type: 'GET',
		url : 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + artist + '&limit=5&api_key=9ecc895dc348c77b4292d651c2169374&format=json',
		dataType: 'json',
		success: function(data) {
			topTracks = data;
		}
	});
	return topTracks;
}