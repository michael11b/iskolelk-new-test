import mongoose from 'mongoose';
import User from './userModel.js';
import { alsubjects, olsubjects } from '../data/data.js';

// Helper function to get all AL streams
const getALStreams = () => {
  return alsubjects.map(subject => Object.keys(subject)[0]);
};

// Helper function to get all AL subjects for a stream
const getALSubjectsForStream = (stream) => {
  const streamData = alsubjects.find(subject => Object.keys(subject)[0] === stream);
  return streamData ? streamData[stream] : [];
};

// Helper function to get all OL subjects
const getOLSubjects = () => {
  return olsubjects;
};

// Helper function to validate AL stream
const validateALStream = (stream) => {
  return getALStreams().includes(stream);
};

// Helper function to validate subject based on exam type and stream
const validateSubject = function(subject) {
  if (this.examType === 'al') {
    if (!this.stream) return false;
    const validSubjects = getALSubjectsForStream(this.stream);
    return validSubjects.includes(subject);
  } else if (this.examType === 'ol') {
    return getOLSubjects().includes(subject);
  } else if (this.examType === 'scholarship') {
    return true; // No subject validation for scholarship
  }
  return false;
};

const paperSchema = new mongoose.Schema({
    examType: {
        type: String,
        enum: ['al', 'ol', 'scholarship'],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: function() {
            return this.examType !== 'scholarship';
        },
        validate: {
            validator: validateSubject,
            message: props => {
                if (props.examType === 'al') {
                    return `Invalid subject for ${props.stream} stream. Valid subjects are: ${getALSubjectsForStream(props.stream).join(', ')}`;
                } else if (props.examType === 'ol') {
                    return `Invalid OL subject. Valid subjects are: ${getOLSubjects().join(', ')}`;
                } else {
                    return 'Invalid subject';
                }
            }
        }
    },
    stream: {
        type: String,
        required: function() {
            return this.examType === 'al';
        },
        validate: {
            validator: function(stream) {
                if (this.examType !== 'al') return true;
                return validateALStream(stream);
            },
            message: props => `Invalid stream. Valid streams are: ${getALStreams().join(', ')}`
        }
    },
    medium: {
        type: String,
        enum: ['sinhala', 'english', 'tamil'],
        required: true
    },
    paperNumber: {
        type: Number,
        // required: true
    },
    fileUrl: {
        type: String,
        // required: true
    },
    fileSize: {
        type: Number,
        // required: true
    },
    fileType: {
        type: String,
        // required: true
    },
    markingScheme: {
        fileUrl: {
            type: String,
            // required: true
        },
        fileSize: {
            type: Number,
            // required: true
        },
        fileType: {
            type: String,
            // required: true
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    markingSchemeDownloadCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for faster queries
paperSchema.index({ examType: 1, year: 1, subject: 1, stream: 1 });

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;
