import mongoose from 'mongoose';

const CsvUploadSchema = new mongoose.Schema({
  filename: String,
  content: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.models.CsvUpload || mongoose.model('CsvUpload', CsvUploadSchema);