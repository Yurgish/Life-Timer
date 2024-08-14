module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "react/prop-types": "off",
        "no-var": "error", // Рекомендує використовувати let/const замість var
        "prefer-const": "error", // Рекомендує використовувати const коли змінна не змінюється
        semi: ["error", "always"], // Вимагати крапки з комою
        "no-unused-vars": ["warn", { vars: "all", args: "none", ignoreRestSiblings: false }],
    },
};
