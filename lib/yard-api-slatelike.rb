# yard-api-slatelike - a template plugin for YARD-API for better output style.
#
# Copyright (C) 2014 Ahmad Amireh <ahmad@instructure.com>
# Copyright (C) 2014 Instructure, Inc.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

$LOAD_PATH.unshift(File.expand_path(File.dirname(__FILE__)))

require 'yard'
require 'yard-api'

module YARD
  module APISlateLikePlugin
    ROOT          = File.dirname(__FILE__)
    TEMPLATE_PATH = File.join(%W[#{ROOT} .. templates])
  end

  module Templates
    Engine.register_template_path YARD::APISlateLikePlugin::TEMPLATE_PATH
  end

  require 'yard-api-slatelike/version'
  require 'yard-api-slatelike/options'
end
