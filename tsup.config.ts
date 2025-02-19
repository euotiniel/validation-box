import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "index": "src/index.ts",
    "validators/generics": "src/validators/generics.ts",
    "validators/countries/angola": "src/validators/countries/angola.ts",
    "validators/countries/brasil": "src/validators/countries/brasil.ts",
    "validators/countries/usa": "src/validators/countries/usa.ts",
    "test/manual": "src/test/manual.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
});
