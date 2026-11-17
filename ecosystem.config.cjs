/**
 * STARX ALPHA LABS — PM2 PROCESS MANAGER ECOSYSTEM
 * Usage:
 *   pm2 start ecosystem.config.cjs
 *   pm2 status
 *   pm2 logs starx-stitch-worker
 *   pm2 restart starx-stitch-worker
 */

module.exports = {
  apps: [
    {
      name: "starx-stitch-worker",
      script: "./scripts/stitch-worker.mjs",
      instances: 1, // Single queue coordinator or scale to multiple workers
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        STITCH_JOB_LEASE_MS: "600000",
        STITCH_MAX_RETRIES: "3",
      },
      error_file: "./logs/stitch-worker-err.log",
      out_file: "./logs/stitch-worker-out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
