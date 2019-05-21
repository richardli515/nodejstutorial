Crud with mongo db

In relational databases we have tables and rows, in MongoDB we have collections and documents. A document can contain sub-documents. 

Brew install mongodb
Npm i mongoose
sudo mkdir -p /data/db
sudo chown -R `id -un` /data/db
mongd (mongo daemon)

mongoose.connect()
mongoose.Schema()

Once we have a schema, we need to compile it into a model. A model is like a class. It’s a blueprint for creating objects

Schema type: String, Number, Date, Buffer(to store binary data), Boolean, ObjectID(unique id), Array

.save() return a Promise
.find() 

Command line import:
mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray
