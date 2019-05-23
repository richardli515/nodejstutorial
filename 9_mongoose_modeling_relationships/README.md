Mongoose - modeling relationships between connected data

Normalization ⇒ consistency

Denormalization ⇒ performance
Hybrid: store part of attrs of another table.

.populate() to show details of referenced collection

We can create a reference in the field or directly embed a document in the field.

When referencing a document, there is really no relationship between these two documents. So, it is possible to reference a non-existing document.

We don’t have transactions in MongoDB. To implement transactions, we use a pattern called “Two Phase Commit”. If you don’t want to manually implement this pattern, use the Fawn NPM package

ObjectIDs are almost unique. In theory, there is a chance for two ObjectIDs to be equal but the odds are very low (1/16,000,000) for most real-world applications. // Validating ObjectIDs mongoose.Types.ObjectID.isValid(id); - To validate ObjectIDs using joi, use joi-objectid NPM package