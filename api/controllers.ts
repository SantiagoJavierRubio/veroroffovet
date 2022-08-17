import { Request, Response, NextFunction } from 'express';
import services from './services';

class Controller {
    async getRecursos(req: Request, res: Response, next: NextFunction) {
        const recursos = await services.listarRecursos();
        res.json(recursos);
    }
    async getClientes(req: Request, res: Response, next: NextFunction) {
        const clientes = await services.listarClientes();
        res.json(clientes);
    }
}

export default new Controller;