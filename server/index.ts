// Package imports
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import cors from 'cors';
import 'module-alias/register';

// Database
import { connectDB } from 'connect/index';

// Routes
import { endpoints } from 'data';
import { authRoutes, expenseRoutes, groupRoutes } from 'routes';

// Middleware
import { notFoundMiddleware, errorMiddleware, protectRoute } from 'middleware';

dotenv.config();

connectDB();

const app: Express = express();

app.use(cors());

// Log response status codes in the console during development
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

// Parse incoming requests as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port: number = Number(process.env.PORT) || 5000;

app.get('/api/test', (_req: Request, res: Response) => {
	res.json({ message: 'Proxy enabled' });
});

// Any time these routes are hit, route file is called
app.use(endpoints.auth, authRoutes);
app.use(endpoints.expense, protectRoute, expenseRoutes);
app.use(endpoints.group, protectRoute, groupRoutes);

// Looking for route not matched errors
app.use(notFoundMiddleware);

// Looking for errors inside existing route
app.use(errorMiddleware);

app.listen(port, () => {
	console.log(
		`Server is listening on port: ${colors.bgMagenta(port.toString())}`
	);
});
