import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI!);
		console.log(
			colors.cyan.underline(`Database connected ${conn.connection.host}`)
		);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
