module.exports = {
  async up(db) {
    await db.createCollection('users')
    await db.createCollection('products')
    await db.createCollection('histories')
    await db.collection('users').insertOne({
      username: 'Chapolim',
      email: 'chapolim@colorado.com',
      password: 'teste123',
      isAdmin: false,
    })
    await db.collection('products').insertOne({
      title: 'PS5',
      description: 'Console da nova geração da marca Sony',
      price: 4800,
      quantity: 10,
      image:
        'https://images.kabum.com.br/produtos/fotos/238671/console-sony-playstation-5_1634132554_g.jpg',
    })
  },

  async down(db) {
    await db.collection('users').drop()
    await db.collection('products').drop()
    await db.collection('histories').drop()
  },
}
