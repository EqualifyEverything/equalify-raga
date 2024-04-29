module.exports = {
  apps: [
    {
      name: 'dummyAPI::tsc',
      script: 'npm',
      cwd: './dummyAPI',
      args: 'run watch',
      watch: false,
      ignore_watch: ['node_modules', 'public'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'dummyAPI::dev',
      script: 'npm',
      cwd: './dummyAPI',
      args: 'run start',
      watch: true,
      ignore_watch: ['node_modules', 'public'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'chromeExtension::dev',
      script: 'npm',
      args: 'run start',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
