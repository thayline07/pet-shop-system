#!/usr/bin/env node
/**
 * Run this script to apply pending Prisma migrations
 * Usage: node scripts/migrate.js
 * Or in package.json: "pnpm exec prisma migrate deploy"
 */

const { spawn } = require('child_process');

const migrate = spawn('npx', ['prisma', 'migrate', 'deploy'], {
  stdio: 'inherit',
  shell: true,
});

migrate.on('exit', (code) => {
  process.exit(code);
});
