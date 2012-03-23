module Jekyll
  module RemoveExtension
    def remove_extension(input)
      input.gsub(/\.\w+\Z/, '')
    end
  end
end

Liquid::Template.register_filter(Jekyll::RemoveExtension)