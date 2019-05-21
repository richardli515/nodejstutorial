Mongoose data validation
We need to use both mongoose validation and joi for database level and api level validation.

We can define a type independently or define it with constraints in obj, even with async validators.

new mongoose.Schema({ name: { type: String, required: true } })

- Validation logic is executed by Mongoose prior to saving a document to the database. You can also trigger it manually by calling the validate() method. 
- Built-in validators: 
- Strings: minlength, maxlength, match, enum 
- Numbers: min, max 
- Dates: min, max 
- All types: required

- Strings: lowercase, uppercase, trim 
- All types: get, set (to define a custom getter/setter)