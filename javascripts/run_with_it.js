(function ($) {

//Models
SiteMap = Backbone.Model.extend({
  defaults : {
    links: []
  },
  initialize: function(){
    this.getSitemap()
  },
  getSitemap: function(){
    var self = this;
    $.ajax({
      url: "/feed.xml",
      dataType: "xml",
      success: function(data){
        var xml = $(data).find("item")
        $.each(xml, function(index, item) {
          var t    = $(this)
          var item = {
            title:       t.find("title").text(),
            link:        t.find("link").text(),
            pubDate:     t.find("pubDate").text(),
            author:      t.find("author").text()
          }
          self.get("links").push(item)
        });
      }
    })
  }

});

// Views
SearchView = Backbone.View.extend({
  initialize: function(){
    this.render();
    $(this.options.el + 'input[type="text"]').focus();
  },
  render: function(){
    var template = _.template( $("#search_template").html(), {} );
    this.el.html( template );
  },
  events: {
    "click input[type=button]": "doSearch",
    "keyup #search_input": "doSearch"
  },
  showResults: function(matches){
    var str = "<div><ul>";
    $.each(matches, function(index, item) {
      str += "<li><a href='" + item.link + "'>" + item.title + "</a></li>";
    });
    str += "</ul></div>";

    $('#search_results').html(str);
  },
  doSearch: function( event ){
    var search_value = value = $("#search_input").val()
    var links = this.options.sitemap.attributes.links
    var matches = $.grep(links, function (value) {
                      search = new RegExp(search_value,"gi");
                      if(value.title.match(search)) return true;
                      return false;
                    }
                  );
    if (search_value.length === 0) matches = [];
    this.showResults(matches);
  }
});

})(jQuery);