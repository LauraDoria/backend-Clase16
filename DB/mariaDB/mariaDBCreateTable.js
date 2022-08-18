const {options} = require('../options/mariaDB')
const knex = require('knex')(options)

knex.schema.createTable('productsRawEcommerce', table => {
    table.increments('id')
    table.string('productCode')
    table.integer('stock')
    table.string('name')
    table.string('productType')
    table.string('skinType')
    table.string('hairType')
    table.string('function')
    table.string('zeroWaste')
    table.integer('price')
    table.string('presentation')
    table.string('thumbnail')
    table.string('detailThumbnail')
    table.string('description')
    table.string('instructions')
    table.string('inci')
}).then(
    () => console.log('New table created')
).catch(
    (error) => console.error(error)
).finally(() => {
    knex.destroy()
})

knex.schema.createTable('cartsRawEcommerce', table => {
    table.increments('id')
    table.string('timestamp')
    table.json('products')
}).then(
    () => console.log('New table created')
).catch(
    (error) => console.error(error)
).finally(() => {
    knex.destroy()
})

