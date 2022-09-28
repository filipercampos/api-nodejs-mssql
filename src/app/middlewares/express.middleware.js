module.exports = (express, app) => {
  const cors = require('cors');
  app.use(cors());
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(express.json({ limit: '50mb' }));
  app.use(
    cors({
      exposedHeaders: ['X-Total-Count', 'X-Total-Page', 'X-Page'],
    })
  );
};
