import { Router, Request, Response } from 'express';
const route = Router();

export default (app: Router) => {
    app.use('/profile', route);

    route.get('/info', function(req: Request, res: Response) {
        res.send({ msg: `testy mctester bigs you adieu`});
    });
}