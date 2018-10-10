module.exports = {
  apps : [
    {
      "name": "koa2-server-wx-mall",
      "script" : "app.js",
      "exec_interpreter": "babel-node",
      "exec_mode": "fork_mode",
      "env": {
        "NODE_ENV": "development",
      },
      "env_production": {
        "NODE_ENV": "production"
      },
    }
  ]
}
