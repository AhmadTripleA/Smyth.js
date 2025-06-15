import { Router } from 'express';
import { FileHttpController } from './controllers/FileController';
import multer from 'multer';
import { fileService } from '../../application/configs/portsConfig';

const router = Router();

const fileHttpController = new FileHttpController(fileService);
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), fileHttpController.uploadFile);
router.get('/file', fileHttpController.getFile);

export default router;