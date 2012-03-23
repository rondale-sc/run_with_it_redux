module Jekyll
  class StripExtension < Liquid::Tag

    def initialize(tag_name, url, token)
      super
    end

    def render(context)
      page = context.environments.first["page"]
      page['url'].split(".")[0]
    end
  end
end

Liquid::Template.register_tag('url_without_extension', Jekyll::StripExtension)