import { Router, Request, Response } from 'express';
const route = Router();

export default (app: Router) => {
  app.use('/test', route);

  route.get('/hi', function (req: Request, res: Response) {
    // Connections to the API are authenticated using Authorization header &
    // Bearer jwt strategy. Access user's UID by req.user.sub
    console.log(`From https: ${req.user.sub}`);
    res.send({ msg: `hi ${req.user.sub}` });
  });

  route.get('/login', function(req: Request, res: Response){
    res.send('This isnt used..')
  })
};
