require('dotenv').config();
const express = require('express');
const app = require('./app');
const { initCrons } = require('./cronJobs');
const PORT = process.env.PORT || 3000;

app.use(express.json());

const { exec } = require('child_process');

exec('npx sequelize-cli db:migrate', (err, stdout, stderr) => {
  if (err) {
    console.error('❌ Migration error:', stderr);
    process.exit(1);
  }
  console.log('✅ Migrations applied:\n', stdout);

  initCrons();

  app.listen(PORT, () => {
    console.log(`🚀 Server running`);
  });
});