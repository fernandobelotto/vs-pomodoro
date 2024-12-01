import * as esbuild from "esbuild";

const buildOptions = {
  entryPoints: ["src/webview/index.tsx"],
  bundle: true,
  outfile: "out/webview.js",
  format: "iife",
  platform: "browser",
  minify: process.env.NODE_ENV === "production",
  sourcemap: process.env.NODE_ENV !== "production",
  target: ["chrome91"],
  loader: {
    ".tsx": "tsx",
    ".ts": "ts",
  },
};

try {
  await esbuild.build(buildOptions);
  console.log("⚡ Webview bundle built successfully!");
} catch (err) {
  console.error("Error building webview bundle:", err);
  process.exit(1);
}
