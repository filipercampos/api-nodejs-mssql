module.exports = class AppDataConfig {
  constructor() {
    this.env = null;
    this.server = null;
    this.port = null;
    this.mssqlConfig = {
      server: null,
      database: null,
      port: null,
      user: null,
      password: null,
      connectionTimeout: null,
      requestTimeout: null,
      pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 300,
      },
      options: {
        encrypt: false, // for azure use true
      },
    };
  }

  load(cfg) {
    this.env = cfg.ENV;
    this.server = cfg.SERVER.HOST;
    this.port = cfg.SERVER.PORT;
    const mssqlConfigData = cfg.DB.MSSQL;

    //config SQL Server
    this.mssqlConfig = {
      server: mssqlConfigData.HOST,
      database: mssqlConfigData.DATABASE,
      port: mssqlConfigData.PORT,
      user: mssqlConfigData.USER,
      password: mssqlConfigData.PASSWORD,
      connectionTimeout: mssqlConfigData.CONNECTION_TIMEOUT,
      requestTimeout: mssqlConfigData.REQUEST_TIMEOUT,
      pool: {
        min: mssqlConfigData.POOL.MIN,
        max: mssqlConfigData.POOL.MAX,
        idleTimeoutMillis: mssqlConfigData.POOL.IDLE_TIMEOUT_MILLIS,
      },
      options: {
        encrypt: mssqlConfigData.OPTIONS.ENCRYPT,
      },
    };
    //env
    process.env.ENV = this.env;
    process.env.PORT = this.port;
  }
};
