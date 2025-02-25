import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "index": "src/index.ts",
    "validators/generics": "src/validators/generics.ts",
    "validators/countries/angola": "src/validators/countries/angola.ts",
    "validators/countries/brasil": "src/validators/countries/brasil.ts",
    "validators/countries/usa": "src/validators/countries/usa.ts",
    "manual/generics-countries": "src/manual/generics-countries.ts",
    "manual/schema": "src/manual/schema.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
});
