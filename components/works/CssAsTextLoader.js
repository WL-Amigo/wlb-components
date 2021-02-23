const { readFile } = require("fs/promises");
const CSSO = require("csso");
const PostCSS = require("postcss");

/** @type {import("snowpack").SnowpackPluginFactory } */
module.exports = function (snowpackConfig) {
  return {
    name: "css-as-text-loader",
    resolve: {
      input: [".inline.css"],
      output: [".js"],
    },
    load: async ({ filePath }) => {
      const content = await readFile(filePath, { encoding: "utf8" });
      const postcssOutput = await PostCSS([
        require("tailwindcss"),
        require("autoprefixer"),
      ]).process(content, {
        from: filePath,
        to: filePath,
      });
      const minified = CSSO.minify(postcssOutput.css).css;
      return {
        ".js": { code: `export default ${JSON.stringify(minified)};` },
      };
    },
  };
};
