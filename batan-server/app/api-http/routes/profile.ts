import { Router, Request, Response } from 'express';
const route = Router();

export default (app: Router) => {
    app.use('/profile', route);

    route.get('/info', function(req: Request, res: Response) {
        res.send({ msg: `testy mctester bigs you adieu`});
    });

    route.post('/delete-profile', function(req: Request, res: Response) {
        //todo delete the user's information
        res.send({ status: `//todo confirmation status that everything is deleted`});
    });
}