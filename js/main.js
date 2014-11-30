$(document).ready(function() {
	$('#search-artists-form').submit(function(e) {
		e.preventDefault();
		$('#top-tracks').empty();
		$('#loading').show();
		var searchQuery = $('#search-artist-field').val();
		var bgPage = chrome.extension.getBackgroundPage();
		var artist = bgPage.getArtist(searchQuery);
		var topTracks = bgPage.getTopTracks(artist.results.artistmatches.artist.name);
		$('#loading').hide();
		displayTopTracks(topTracks);
	});
	
	function displayTopTracks(topTracks) {
		var topTracks = topTracks.toptracks.track;
		for (var key in topTracks) {
			if (topTracks.hasOwnProperty(key)) {
				var songLinkQuery = topTracks[key].artist.name + '-' + topTracks[key].name;
				var songLink = $('<a>', {target: '_blank', class: 'song-icon', href: 'http://www.google.com/search?q=' + songLinkQuery});
				var row = $('<div>', {class: 'row', text: topTracks[key].name});
				row.append(songLink);
				$('#top-tracks').append(row);
			}
		}
	}
});