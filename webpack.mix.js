const mix = require('laravel-mix');
require('mix-tailwindcss'); // Optional: Add Tailwind CSS

mix.js('src/js/index.js', 'public/js/app.js') // Change 'resources/js/app.js' to your React entry file
   .react()
   .sass('src/scss/app.scss', 'public/css')
   .tailwind('./tailwind.config.js') // Optional: Add Tailwind CSS
   .webpackConfig({
        devtool: 'source-map', // Optional: Add source maps for better debugging
   });

if (mix.inProduction()) {
    mix.minify('public/js/app.js') // Minify JS for production
    .minify('public/css/app.css') // Minify CSS for production
    .version(); // Versioning assets for production
}