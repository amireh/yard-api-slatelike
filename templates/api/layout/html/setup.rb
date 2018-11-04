def stylesheets
  theme = case api_options.theme.downcase
  when 'vroom'
    'css/vroom.css'
  when 'default', 'slate', 'slatelike'
    'css/slatelike.css'
  end

  super + [ theme ]
end

def javascripts
  super + %w[
    js/scrollspy.js
    js/slatelike.js
  ]
end

def inline_stylesheets
  super + %w[ _styles ]
end