module.exports = ({ env }) => ({
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    env === "production" ? require("autoprefixer") : false,
  ],
});
