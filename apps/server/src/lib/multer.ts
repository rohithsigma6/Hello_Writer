import multer from 'multer'


const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 500 * 1024 * 1024 // Maximum file size is 10MB
    }
});

export default upload