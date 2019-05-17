const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{ useNewUrlParser: true });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function removeCourse(id) {
  const result=await Course.deleteOne({_id:id}); //deleteMany
  // const course=await Course.findByIdAndRemove(id);
  console.log(result);
}

removeCourse('5a68fde3f09ad7646ddec17e');