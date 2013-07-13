#!/usr/bin/env python
#
# Copyright 2011 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util

class MainHandler(webapp.RequestHandler):
    def get(self):
        # Set the cross origin resource sharing header to allow AJAX
        self.response.headers.add_header("Access-Control-Allow-Origin", "*")
        # Print some JSON
        self.response.out.write('<h3>Welcome to the "Watch A Movie" Google Plus Hangout App!</h3><p>This app allows you to watch any HTML5 video with your friends<br>You can get a copy of the source from my github account. <br><a href="https://github.com/mkunz7/watchamovie">https://github.com/mkunz7/watchamovie</a><br><br></p> <a href="https://plus.google.com/hangouts/_?gid=207061976796" style="text-decoration:none;"> <img src="https://ssl.gstatic.com/s2/oz/images/stars/hangout/1/gplus-hangout-60x230-normal.png" alt="Start a Hangout" style="border:0;width:230px;height:60px;"/> </a>')


def main():
    application = webapp.WSGIApplication([('/', MainHandler)],
                                         debug=True)
    util.run_wsgi_app(application)

if __name__ == '__main__':
    main()
