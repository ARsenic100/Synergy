import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    content: { type: String, required: true }, // Comment content
    createdAt: { type: Date, default: Date.now }, // Timestamp for the comment
  },
  { _id: true } // Ensure comments have their own unique `_id`
);

const AttachmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // File name
    url: { type: String, required: true }, // File URL
    type: { type: String, required: true }, // MIME type (e.g., image/png, application/pdf)
  },
  { _id: true } // Ensure attachments have their own unique `_id`
);

const SupportTicketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    subject: { type: String, required: true }, // Ticket subject
    description: { type: String, required: true }, // Ticket description
    category: { type: String, enum: ['technical', 'billing', 'general'], required: true }, // Category of the ticket
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' }, // Priority level
    status: { type: String, enum: ['open', 'in-progress', 'resolved', 'closed'], default: 'open' }, // Ticket status
    attachments: [AttachmentSchema], // Array of attachments
    comments: [CommentSchema], // Array of comments
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` timestamps
  }
);

export default mongoose.model('SupportTicket', SupportTicketSchema);
