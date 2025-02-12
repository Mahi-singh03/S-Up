import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

// Export the model only if it hasn't been registered yet
export default mongoose.models.Review || mongoose.model('Review', reviewSchema); 