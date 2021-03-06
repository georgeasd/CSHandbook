(function(){
    $('nav ul li').mouseenter(function(){
        var nestedNav =  $(this).find('ul');
        nestedNav.css({
            'margin-left': -parseInt(nestedNav.outerWidth()) / 2,
        });
        nestedNav.parent('div').css({
            'height':100
        });
    });

    var topics = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 10,
        prefetch: {
            url: 'topics.json',
            ttl_ms: 5000,
            filter: function(list){
                return $.map(list,function(topic){return {name: topic}; });
            }
        }
    });
    topics.initialize();

    $('#searchBar').typeahead({
        hint: true,
        highlight: true,
    },{
        name: 'topics',
        displayKey: 'name',
        source: topics.ttAdapter()
    });

    $('#searchBar').keypress(function(e){
        if(e.keyCode == 13){
            var topic = $('#searchBar').val().replace(/ /g,"_");
            window.location.href = "./"+topic;
        }
    });

    $('#searchBar').on('typeahead:selected',function(e){
        var topic = $('#searchBar').val().replace(/ /g,"_");
        window.location.href = "./"+topic;
    });

    $('textarea').on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            var val = this.value;
            var selected = val.substring(start, end);
            var re = /^/gm;
            var count = selected.match(re).length;


            this.value = val.substring(0, start) + selected.replace(re, '    ') + val.substring(end);
            this.selectionStart = start;
            this.selectionEnd = end + 4;
        }
    });

})();