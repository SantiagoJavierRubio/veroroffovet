import { Request, Response, NextFunction } from 'express';
import services from './services';
import "dotenv/config";

class Controller {
    async getRecursos(req: Request, res: Response, next: NextFunction) {
        const recursos = await services.listarRecursos();
        res.json(recursos);
    }
    async getClientes(req: Request, res: Response, next: NextFunction) {
        const clientes = await services.listarClientes();
        res.json(clientes);
    }
    async getToken(req: Request, res: Response, next: NextFunction) {
        const token = await services.showToken();
        res.json(token);
    }
    async refreshMetaToken(req: Request, res: Response, next: NextFunction) {
        if (req.body.secret !== process.env.IG_TOKEN_SECRET) {
            return res.status(401).json({
                message: "Invalid secret"
            });
        }
        const metaToken = await services.refreshMetaToken();
        res.json(metaToken);
    }
}

export default new Controller;