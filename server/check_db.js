import mongoose from 'mongoose';

async function checkDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/portfolio_db');
    console.log('Successfully connected to MongoDB portfolio_db!\n');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log('================================================--');
    console.log('MongoDB Database: portfolio_db');
    console.log('================================================--');

    for (let col of collections) {
      const docs = await db.collection(col.name).find({}).toArray();
      console.log(`\n📁 Collection: "${col.name}" (${docs.length} documents)`);
      docs.forEach((doc, idx) => {
        console.log(`  [${idx + 1}] ID: ${doc._id}`);
        if (doc.title) console.log(`      Title: ${doc.title}`);
        if (doc.name) console.log(`      Name: ${doc.name} (${doc.email})`);
        if (doc.email && doc.role) console.log(`      Admin: ${doc.email} (Role: ${doc.role})`);
      });
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
}

checkDatabase();
