# yard-api-slatelike

## What is?

A plugin that overrides the templates provided by [yard-api](https://github.com/amireh/yard-api) to make it look more like [slate](https://github.com/tripit/slate).

## Usage

Nothing special except that you have to include the gem in your Gemfile (if using bundler) *after* `yard-api`. E.g:

```ruby
# Gemfile

group :doc do
  gem 'yard-api'
  gem 'yard-api-slatelike'slatelike'
end
```

Here's a sample Rake task `doc:generate` that invokes yard-api's rake task:

```ruby
namespace :doc do
  desc 'generate docs using yard-api'
  task :generate => :environment do
    require 'yard-api'
    require 'yard-api/yardoc_task'
    require 'yard-api-slatelike'

    YARD::APIPlugin::YardocTask.new(:my_app_docs)
    Rake::Task['my_app_docs'].invoke
  end
end
```

## Configuration

The plugin comes with two themes out of the box, one that is a mimic of Slate's, and another which follows the same layout but with different colors and a few readability (opinionated) enhancements.

    1. `slate` (default)
    2. `vroom` (recommended)

You can specify the theme in your `yard_api.yml` file under the `theme` parameter.

## License
Released under the [AGPLv3](http://www.gnu.org/licenses/agpl-3.0.html) license.