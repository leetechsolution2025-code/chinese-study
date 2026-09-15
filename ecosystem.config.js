module.exports = {
  apps: [
    {
      name: 'chinese-study',
      script: 'npm',
      args: 'start -- -p 3350',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '600M',
      env: {
        NODE_ENV: 'production',
        PORT: 3350
      }
    }
  ]
};
