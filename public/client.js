$(function(){
	$.get('/blocks', appendToList);

	function appendToList(blocks) {
		var list = [];
		for(var i in blocks) {
			list.push($('<li>', {text: blocks[i], class: 'list-group-item'}));
		}

		$('.block-list').append(list);
	}
});