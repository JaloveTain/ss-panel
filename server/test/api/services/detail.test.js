'use strict'

const plugins = require('../../lib/plugin')
const utility = require('../../lib/utility')

let BASE_PATH = '/api/services/detail'
let userPlugin = plugins.user()

describe(BASE_PATH, function () {
  let node

  before(function* () {
    yield userPlugin.before()
    node = yield utility.createTestNodeAsync()
  })

  after(function* () {
    yield utility.removeTestNodeAsync(node)
    yield userPlugin.after()
  })

  describe('get', function () {
    it('should return error if service not found', function* () {
      yield api.get(BASE_PATH)
        .query({serviceId: -1})
        .use(userPlugin.plugin())
        .expect(404)
    })

    it('should return node detail', function* () {
      yield api.get(BASE_PATH)
        .query({serviceId: node.nodeId})
        .use(userPlugin.plugin())
        .expect(200)
    })
  })
})
