import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salary: { type: Number },
  expenses: { type: [Object] },
});

const User = mongoose.model('User', userSchema);

export default User;
