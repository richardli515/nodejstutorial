const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{ useNewUrlParser: true });

const courseSchema = new mongoose.Schema({
  name: {
      type:String, 
      required:true,
      minlength: 5,
      maxlength: 255,
    //   match: /pattern/
    },
    category:{
        required: true,
        type: String,
        enum: ['web', 'mobile','network'],
        lowercase: true,
        // uppercase: true,
        trim: true,
    },
  author: String, 
  tags: {
      type:Array,
      validate:{
            validator: function(v){
                // isAsync is deprecated, using promise here
                return new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        const result=v && v.length>0;
                        resolve(result);
                    },2000);
                });
            },
            message: 'A course should have at least one tag'
        }
  },
  date: Date, 
  isPublished: Boolean,
  price: {
      type: Number,
      required: function(){return this.isPublished;}, //this refers to the function of mongodb not the courseSchema object
      min: 10,
      max: 200,
      get: v => Math.round(v),
      set: v => Math.round(v)
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category:'Web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    })
    try{
        const result = await course.save();
        console.log(result);
    }catch(ex){
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }   
}

createCourse();