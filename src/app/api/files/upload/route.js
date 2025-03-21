import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create the "uploads" directory if it doesn't exist
if (!fs.existsSync('./public/uploads')) {
    console.log("Path exists..........");
    fs.mkdirSync('./public/uploads');
}

// Set up multer to handle the file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads'); // Path to save the uploaded file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Helper function to handle multer in a Next.js API route
const uploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: 'File upload error', error: err });
    }
    next(); // Proceed to the next step (our handler)
  });
};

// POST handler for file upload
export async function POST(req, res) {
  // Make sure the request is using multipart form-data
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Use the custom upload middleware
  uploadMiddleware(req, res, () => {
    // Now that multer has handled the file upload, let's handle it further

    // Check if the file is undefined
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Check if other required fields are provided
    const { title, author, description, url, userId } = req.body;
    const file = req.file;

    // Return file upload details
    const fileDetails = {
      title,
      author,
      description: description || '',
      url: url || '',
      userId,
      fileName: file.filename, // File's stored name
      fileSize: file.size,     // File size in bytes
      filePath: file.path,     // File path in the system
      fileUrl: `/uploads/${file.filename}`, // URL to access the file
    };

    return res.status(200).json({
      message: 'File uploaded successfully',
      data: fileDetails,
    });
  });
}
