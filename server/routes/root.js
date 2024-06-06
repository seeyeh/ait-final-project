import Express from 'express';
import { fileURLToPath } from 'url';
const router = Express.Router()
import path from 'path';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
    // ^ requires an absolute path, which is why you can't use a relative path '../views/index.html' as the parameter to sendFile

    
})

export default router;