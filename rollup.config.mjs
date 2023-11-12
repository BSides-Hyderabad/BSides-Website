// rollup.config.js
import scss from "rollup-plugin-scss";
import { writeFileSync } from "fs";

export default {
  input: "./assets/js/main.js",
  output: {
    file: "./assets/js/main.min.js",
    format: "esm",
  },
  plugins: [
    scss({
      fileName: "output.css",
      // outputStyle: "compressed",
      watch: "./assets/scss/",
      output: function (styles) {
        writeFileSync("./assets/css/bundle.css", styles);
      },
    }),
  ],
};
