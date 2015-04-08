$(function(){
	$.get('/blocks', appendToList);

	$('form').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var blockData = form.serialize();

		$.ajax({
			type: 'POST', url: '/blocks', data: blockData
		}).done(function(block){
			console.log('Added ' + block.name + ' block.');
			appendToList([block]);
			form.trigger('reset');
		});
	});

	$('.block-list').on('click', 'a[data-block]', function(event){
		if(!confirm('Are you sure?')) {
			return false;
		}

		var target = $(event.currentTarget);

		$.ajax({
			type: 'DELETE',
			url: '/blocks/' + target.data('block')
		}).done(function(){
			console.log('Deleted block');
			target.parents('li').remove();
		});
	});
	
	function appendToList(blocks) {
		var list = [];
		var content, block;
		for(var i in blocks) {
			block = blocks[i];
			content = '<a href="/blocks/' + block + '">' + block + '</a>'
			+ '<a href="#" data-block="' + block + '"><i class="glyphicon glyphicon-remove" data-delete>' + '</i>';
			list.push($('<li>', {html: content, class: 'list-group-item'}));
		}

		$('.block-list').append(list);
	}
});