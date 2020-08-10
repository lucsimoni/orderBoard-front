const gulp = require('gulp'),
 i18nExcel2json = require('gulp-i18n-excel2json'),
 distPath = '../src/assets/translations/',
 excelPath = "../src/assets/translation_orderboard.xlsx";

 
gulp.task('build', async () => {
    gulp.src(excelPath)
        .pipe(i18nExcel2json({
            destFile : '__lng__.json',
            readable: true,
            colKey: 'A',
            colValArray: ['B', 'C'],
            rowStart: 2,
            rowHeader: 1
        }))
        .pipe(gulp.dest(distPath))
});