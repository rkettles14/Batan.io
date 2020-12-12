import { Router } from 'express';
import test from './routes/test';
import profile from './routes/profile';


export default () => {
	const app = Router();
	test(app);
	profile(app);

	return app
}
