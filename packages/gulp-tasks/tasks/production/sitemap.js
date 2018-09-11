const gulp = require('gulp');
const sitemap = require('gulp-sitemap');
const { dist, project } = require('../config');

if (project.siteUrl) {
  gulp.task('sitemap', () =>
    gulp.src(`${dist}/*.html`)
    .pipe(sitemap({
      siteUrl: project.siteUrl,
    }))
    .pipe(gulp.dest(`${dist}/*.html`))
  );
}
