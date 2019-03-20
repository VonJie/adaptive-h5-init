var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var px2rem = require('gulp-px2rem-plugin');
var autoprefixer = require('gulp-autoprefixer');

var reload = browserSync.reload;

// css 转化 rem
gulp.task('css-2-rem',css2rem);
function css2rem(){
	return gulp.src('./css/*.css')
			.pipe(px2rem({
				'width_design': 750, // 设计稿宽度。默认值640
				'valid_num': 3, // 生成rem后的小数位数。默认值4
				'pieces': 8, // 将整屏切份。默认为10，相当于10rem = width_design(设计稿宽度)
				'ignore_px': [ 1 ], // 让部分px不在转换成rem。默认为空数组
				'ignore_selector': [ '.class1' ] // 让部分选择器不在转换为rem。默认为空数组
			}))
			.pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
			.pipe(gulp.dest('./css/build'))
			.pipe(reload({stream: true}))
}


// 静态服务器 + 监听 css/html 文件
gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    // 监听文件变化
	  gulp.watch('./css/*.css').on('change', css2rem);

    gulp.watch("./*.html").on('change', reload);
});


// gulp.task('build', gulp.series('css-2-rem'));