const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

    // define shape of documents
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// create model class
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    })
    const result = await course.save();
    console.log(result);
}

// createCourse();

async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // or
    // and
    const pageNumber =1;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true})
        // .find({price: {$gte: 10, $lte: 20}})
        // .find({price: {$in: [10,15,20]}})
        // .find().or([{author:'Mosh'},{isPublished:true}])
        // .and([{},{}])
        // .find({author: /^Mosh/}) //starts with
        // .find({author: /Hamedani$/i}) //ends with
        // .find({author: /.*Mosh.*/i })
        .skip((pageNumber -1) * pageSize) // use skip() and limit() for pagination
        .limit(pageSize)
        .sort({ name: 1 })
        // .estimatedDocumentCount(); //.count() is deprecated
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();