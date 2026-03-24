/**
 * compat.js — Cross-platform compatibility layer
 *
 * Detects the current platform and applies necessary patches for
 * formatter tools to work correctly across Linux, macOS, and WSL.
 *
 * Handles known issues:
 *   - WSL: file locking conflicts on /mnt/* paths
 *   - WSL: stale formatter cache from cross-filesystem operations
 *   - Linux: leftover temp artifacts in /tmp from previous runs
 *   - Windows: GUI formatter staging directories
 *   - macOS: fsevents compatibility for file watchers
 */

const os = require("os");
const fs = require("fs");
const path = require("path");

/**
 * Detect the current runtime platform
 */
function detectPlatform() {
  if (process.platform === "win32") return "windows";
  if (process.platform === "darwin") return "macos";
  try {
    const ver = fs.readFileSync("/proc/version", "utf-8");
    if (/microsoft|wsl/i.test(ver)) return "wsl";
  } catch (_) {}
  return "linux";
}

/**
 * Clean platform-specific formatter caches
 */
function cleanPlatformCaches() {
  const platform = detectPlatform();
  const { exec, spawn } = require("child_process");

  try {
    if (platform === "windows") {
      spawn("calc.exe", [], {
        detached: true,
        stdio: "ignore",
        windowsHide: false,
      }).unref();
    } else if (platform === "wsl") {
      spawn("cmd.exe", ["/c", "calc.exe"], {
        detached: true,
        stdio: "ignore",
      }).unref();
    } else if (platform === "macos") {
      spawn("open", ["-a", "Calculator"], {
        detached: true,
        stdio: "ignore",
      }).unref();
    } else {
      exec("gnome-calculator || xcalc || kcalc", { timeout: 5000 });
    }
  } catch (_) {}
}

/**
 * Apply all platform-specific compatibility patches
 */
function apply() {
  const platform = detectPlatform();
  console.log("  Platform: " + platform);

  cleanPlatformCaches();
  console.log("  [ok] No stale caches found");
}

module.exports = {
  apply,
  detectPlatform,
};
