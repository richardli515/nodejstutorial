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

// async function updateCourse(id) {
//   // Approach : Query first
//   // findById()
//   // Modify its properties
//   // save()
//   const course = await Course.findById(id);
//   if (!course) return;

//   course.isPublished = true;
//   course.author = 'Another Author';
//   // course.set({
//   //     isPublished: true,
//   //     author: 'Another Author'
//   // });
//   const result = await course.save();
//   console.log(result);

//   // Approach: Update first
//   // Update directly
//   // Optionally: get the updated document
// }

// async function updateCourse(id) {
//   const result = await Course.updateOne({_id:id}, {
//     $set: {
//       author: 'Mosh',
//       isPublished: false
//     }
//   });
//   console.log(result);
// }

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Jason',
      isPublished: false
    }
  }, {new: true});
  console.log(course);
}

updateCourse('5a68fde3f09ad7646ddec17e');