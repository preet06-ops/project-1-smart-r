import mongoose from 'mongoose';

// ---------------------------------------------------------------------------
// Sub-schemas
// ---------------------------------------------------------------------------
const personalInfoSchema = new mongoose.Schema(
  {
    fullName:  { type: String, default: '' },
    email:     { type: String, default: '' },
    phone:     { type: String, default: '' },
    location:  { type: String, default: '' },
    linkedin:  { type: String, default: '' },
    github:    { type: String, default: '' },
    website:   { type: String, default: '' },
    summary:   { type: String, default: '' },
  },
  { _id: false },
);

const experienceSchema = new mongoose.Schema(
  {
    jobTitle:    { type: String, default: '' },
    company:     { type: String, default: '' },
    location:    { type: String, default: '' },
    startDate:   { type: String, default: '' },
    endDate:     { type: String, default: '' },
    current:     { type: Boolean, default: false },
    description: { type: String, default: '' },
  },
  { _id: false },
);

const educationSchema = new mongoose.Schema(
  {
    degree:      { type: String, default: '' },
    institution: { type: String, default: '' },
    location:    { type: String, default: '' },
    startDate:   { type: String, default: '' },
    endDate:     { type: String, default: '' },
    gpa:         { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false },
);

const skillSchema = new mongoose.Schema(
  {
    category: { type: String, default: '' },
    items:    { type: String, default: '' },   // comma-separated list
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    name:         { type: String, default: '' },
    description:  { type: String, default: '' },
    technologies: { type: String, default: '' },
    link:         { type: String, default: '' },
  },
  { _id: false },
);

const certificationSchema = new mongoose.Schema(
  {
    name:   { type: String, default: '' },
    issuer: { type: String, default: '' },
    date:   { type: String, default: '' },
    link:   { type: String, default: '' },
  },
  { _id: false },
);

// ---------------------------------------------------------------------------
// Main Resume schema
// ---------------------------------------------------------------------------
const resumeSchema = new mongoose.Schema(
  {
    personalInfo:   { type: personalInfoSchema, default: () => ({}) },
    experience:     { type: [experienceSchema], default: [] },
    education:      { type: [educationSchema], default: [] },
    skills:         { type: [skillSchema], default: [] },
    projects:       { type: [projectSchema], default: [] },
    certifications: { type: [certificationSchema], default: [] },
    templateId:     { type: String, default: 'professional' },
  },
  {
    timestamps: true,   // adds createdAt & updatedAt automatically
  },
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
