"use strict";

// grunt-init 时对此脚手架的描述
exports.description="exports.description:learn grunt-init";

// 开始回答项目相关问题前，控制台打印的相关信息
exports.notes="exports.notes";

// 构建项目结束后，控制台打印的相关信息
exports.after = '项目主框架已经搭建好了，现在可以coding' + '\n\n' + '1、npm install 安装项目依赖的node模块\n' + '2、grunt 运行任务，包括文件压缩、合并、校验等\n\n';

exports.warnOn="*";

exports.template = function(grunt, init, done){

    init.process({
        type:"aditional type"
    }, [
        //Prompt for these values
        init.prompt('name'),
        init.prompt('author'),
        init.prompt('version')
    ], function(err, props){

        //返回一个包含待复制文件源文件的绝对路径和相对的目标路径的对象（prepare）
        var files = init.filesToCopy(props);
        console.log(files);

        //遍历所传递对象中的所有文件，将源文件复制到目标路径，并处理相关内容。（write）
        init.copyAndProcess(files, props);


        //package.json
        init.writePackageJSON('package.json',{
              "name": props.name,
              "version": props.version,
              "author":props.author,
              "dependencies": {
                "grunt": "~0.4.1",
                "grunt-contrib-clean": "~0.5.0",
                "grunt-contrib-uglify": "~0.3.2",
                "grunt-contrib-concat": "~0.3.0",
                "jshint": "~2.4.3",
                "grunt-contrib-jshint": "~0.8.0",
                "grunt-contrib-watch": "~0.5.3",
                "grunt-contrib-copy": "~0.5.0",
                "grunt-usemin": "~2.0.2",
                "grunt-rev": "~0.1.0",
                "grunt-autoprefixer": "~0.6.5",
                "grunt-contrib-cssmin": "~0.8.0",
                "grunt-contrib-imagemin": "~0.5.0",
                "grunt-contrib-connect": "~0.7.1",
                "network-address": "0.0.4"
              }
        });

        var join=require("path").join;
        grunt.file.mkdir(join(init.destpath(),"src/css"));

        //结束
        done();
    });
};