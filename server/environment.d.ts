declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT?: string | number;
			NODE_ENV: 'development' | 'production';
			MONGO_URI: string;
			JWT_SECRET: string;
			JWT_EXPIRES_IN: string;
			CORS_ORIGIN: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
