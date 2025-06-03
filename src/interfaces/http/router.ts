import { Router } from 'express';
import { FileController } from './controllers/FileController';
import multer from 'multer';
import { fileService } from '../../application/configs/portsConfig';

const router = Router();

const fileController = new FileController(fileService);
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/file', fileController.getFile);

export default router;