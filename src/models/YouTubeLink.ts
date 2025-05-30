import mongoose from 'mongoose';

const youtubeLinkSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: [true, 'Please provide a video ID'],
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
youtubeLinkSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.YouTubeLink || mongoose.model('YouTubeLink', youtubeLinkSchema); 