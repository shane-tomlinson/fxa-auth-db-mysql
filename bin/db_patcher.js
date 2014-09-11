/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var path = require('path')
var fs = require('fs')

var config = require('../config')
var api = require('fxa-auth-db-server')
var log = api.log(config.logLevel, 'db-api')

var mysql = require('mysql')
var P = require('../promise.js')
var patcher = require('mysql-patcher')

var patch = require('../db/patch')

// set some options
var options = config.master
options.dir = path.join(__dirname, '..', 'db', 'schema')
options.patchKey = 'schema-patch-level'
options.metaTable = 'dbMetadata'
options.patchLevel = patch.level
options.mysql = mysql
options.createDatabase = true
options.reversePatchAllowed = false

patcher.patch(options, function(err) {
  if (err) {
    log.error(err)
    process.exit(2)
  }
  log.info('Database patched to level ' + options.patchLevel)
})
