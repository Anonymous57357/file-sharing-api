# File Sharing API

A simple file-sharing API that allows users to upload and download files with temporary links. Files are uploaded to Cloudinary and stored in a MongoDB database with expiration times. Expired links automatically invalidate the files and remove them from the system.

## Features

- **File Upload:** Upload files to Cloudinary.
- **Temporary File Links:** Provide time-limited download links for uploaded files (expiry set to 12 hours).
- **Cloudinary Integration:** Secure file storage using Cloudinary.
- **MongoDB Integration:** Track files and their expiry time in MongoDB.
- **File Expiry & Deletion:** Expired files are automatically deleted from the system.

## Installation

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account (for storing files)
- Express.js

### 1. Clone the Repository

```bash
git clone https://github.com/Anonymous57357/file-sharing-api.git
