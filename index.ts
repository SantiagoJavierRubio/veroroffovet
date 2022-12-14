import express, { Request, Response } from 'express';
import path from 'path';
import apiRoutes from './api/routes';
import "dotenv/config";

const app = express();
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

app.use('/api', apiRoutes);
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
server.on('error', (error: any) => {
    console.log(error);
});