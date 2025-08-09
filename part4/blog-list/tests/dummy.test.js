const {test, describe} = require('node:test')
const assert = require('node:assert/strict')
const {dummy} = require('../utils/list_helper')

test('dummy returns one', () => {
    assert.equal(dummy(), 1)
})