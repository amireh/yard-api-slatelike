require File.join(%W[#{File.dirname(__FILE__)} lib yard-api-slatelike version])

Gem::Specification.new do |s|
  s.name        = 'yard-api-slatelike'
  s.summary     = "A template plugin for YARD-API for better output style."
  s.description = <<-eof
    TBD
  eof
  s.version     = YARD::APISlateLikePlugin::VERSION
  s.date        = Time.now.strftime('%Y-%m-%d')
  s.authors     = ["Ahmad Amireh"]
  s.email       = 'ahmad@instructure.com'
  s.homepage    = 'https://github.com/amireh/yard-api-slatelike'
  s.files       = Dir.glob("{config,lib,spec,templates}/**/*") +
                  ['LICENSE', 'README.md', '.rspec', __FILE__]
  s.has_rdoc    = 'yard'
  s.license     = 'AGPL3'
  s.add_dependency 'yard', '>=0.8.7', '<1.0.0'
  s.add_dependency 'yard-api', '>=0.1.2', '<2.0.0'
  s.add_development_dependency 'rspec'
  s.add_development_dependency 'gem-release'
end
