module.exports = {
  apps: [
    {
      name: 'chinese-study',
      script: 'npm',
      args: 'start -- -p 3388',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '600M',
      env: {
        NODE_ENV: 'production',
        PORT: 3388
      }
    }
  ]
};
