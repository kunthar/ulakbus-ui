module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.branchname %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    mangle: false
                },
                files: {
                    'dist/app.js': ['dist/app.js'],
                    'dist/bower_components/components.js': ['dist/bower_components/components.js']
                }
            },
            branch: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.branchname %> <%= grunt.template.today("yyyy-mm-dd") %>' +
                    ' */\n',
                    mangle: false
                },
                files: {
                    'dist/<%= grunt.branchname %>/app.js': ['dist/app.js'],
                    'dist/<%= grunt.branchname %>/bower_components/components.js': ['dist/bower_components/components.js']
                }
            }
        },
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './libs',
                    cleanTargetDir: true
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                singleRun: true
            },

            continuous: {
                singleRun: false,
                autoWatch: true
            }
        },
        html2js: {
            options: {
                rename: function (moduleName) {
                    return moduleName.replace('../app/', '');
                }
            },
            prod: {
                src: ['app/components/**/*.html', 'app/shared/templates/**/*.html'],
                dest: 'dist/templates.js'
            },
            prod_branch: {
                src: ['app/components/**/*.html'],
                dest: 'dist/<%= grunt.branchname %>/templates.js'
            },
            dev: {
                src: ['app/components/**/*.html', 'app/shared/templates/**/*.html'],
                dest: 'app/tmp/templates.js'
            }
        },
        copy: {
            prod: {
                files: [
                    {expand: true, cwd: 'app/bower_components/font-awesome/fonts/', src: '*', dest: 'dist/fonts/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/img/', src: 'brand-logo.png', dest: 'dist/img/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/img/', src: 'loading_spinner.gif', dest: 'dist/img/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/img/', src: 'sample-profile-pic.jpg', dest: 'dist/img/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/img/', src: 'empty-profile-pic.jpg', dest: 'dist/img/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/img/', src: 'favicon.ico', dest: 'dist/img/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/styles/roboto/', src: '**/*', dest: 'dist/css/roboto/', flatten: false},
                    {expand: true, cwd: 'app/styles/', src: 'jquery-ui.min.css', dest: 'dist/css/', flatten: true},
                    {expand: true, cwd: 'app/styles/images/', src: '*', dest: 'dist/css/images/', flatten: true},
                    {expand: true, cwd: 'app/bower_components/bootstrap/dist/fonts/', src: '*', dest: 'dist/fonts/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/bower_components/jquery/dist/', src: 'jquery.min.js', dest: 'dist/bower_components/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/bower_components/angular/', src: 'angular.js', dest: 'dist/bower_components/', flatten: true, filter: 'isFile'}
                ]
            },
            local_prod: {
                files: [
                    {expand: true, cwd: 'app/bower_components/font-awesome/fonts/', src: '*', dest: 'dist/fonts/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/img/', src: 'brand-logo.png', dest: 'dist/img/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/img/', src: 'loading_spinner.gif', dest: 'dist/img/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/img/', src: 'sample-profile-pic.jpg', dest: 'dist/img/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/img/', src: 'empty-profile-pic.jpg', dest: 'dist/img/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/img/', src: 'favicon.ico', dest: 'dist/img/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/styles/roboto/', src: '**/*', dest: 'dist/css/roboto/', flatten: false},
                    {expand: true, cwd: 'app/styles/', src: 'jquery-ui.min.css', dest: 'dist/css/', flatten: true},
                    {expand: true, cwd: 'app/styles/images/', src: '*', dest: 'dist/css/images/', flatten: true},
                    {expand: true, cwd: 'app/bower_components/bootstrap/dist/fonts/', src: '*', dest: 'dist/fonts/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/bower_components/jquery/dist/', src: 'jquery.min.js', dest: 'dist/bower_components/', flatten: true, filter: 'isFile'},
                    {expand: true, cwd: 'app/bower_components/angular/', src: 'angular.js', dest: 'dist/bower_components/', flatten: true, filter: 'isFile'}
                ]
            },
            for_api_docs: {
                files: [
                    {expand: true, cwd: "app/", src: "app.js", dest: "api-docs-source/"},
                    {expand: true, cwd: "app/zetalib/", src: "interceptors.js", dest: "api-docs-source/"},
                    {expand: true, cwd: "app/zetalib/", src: "form_service.js", dest: "api-docs-source/"},
                    {expand: true, cwd: "app/shared/", src: "directives.js", dest: "api-docs-source/"},
                    {expand: true, cwd: "app/components/auth/", src: "auth_controller.js", dest: "api-docs-source/"},
                    {expand: true, cwd: "app/components/auth/", src: "auth_service.js", dest: "api-docs-source/"},
                    {expand: true, cwd: "app/components/crud/", src: "crud_controller.js", dest: "api-docs-source/"}
                ]
            }
        },
        concat: {
            options: {
                separator: '\n\n'
            },
            js: {
                src: [
                    "dist/app.js",
                    "app/app_routes.js",
                    "app/zetalib/interceptors.js",
                    "app/zetalib/general.js",
                    "app/zetalib/form_service.js",
                    "app/zetalib/form_constraints.js",
                    "app/zetalib/error_service.js",
                    "app/zetalib/action_service.js",
                    "app/zetalib/socket.js",
                    "app/zetalib/utils_service.js",
                    "app/shared/directives.js",
                    "app/components/auth/auth_controller.js",
                    "app/components/auth/auth_service.js",
                    "app/components/dashboard/dashboard_controller.js",
                    "app/components/crud/crud_controller.js",
                    "app/components/crud/crud_widgets.js",
                    "app/components/debug/debug_controller.js",
                    "app/components/devSettings/devSettings_controller.js",
                    "app/components/error_pages/error_controller.js",
                    "app/components/wf/wf_controller.js",
                    "app/components/version/version.js",
                    "app/components/version/interpolate-filter.js",
                    "app/components/version/version-directive.js",
                    "app/components/messaging/messaging_service.js",
                    "app/components/messaging/messaging.js"
                ],
                nonull: true,
                dest: 'dist/app.js'
            },
            components: {
                src: [
                    "app/bower_components/angular-i18n/angular-locale_tr.js",
                    "app/bower_components/bootstrap/dist/js/bootstrap.js",
                    "app/bower_components/angular-route/angular-route.js",
                    "app/bower_components/angular-cookies/angular-cookies.js",
                    "app/bower_components/angular-resource/angular-resource.js",
                    "app/bower_components/angular-bootstrap/ui-bootstrap.js",
                    "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
                    "app/bower_components/showdown/dist/showdown.min.js",
                    "app/bower_components/angular-markdown-filter/markdown.js",
                    "app/bower_components/angular-sanitize/angular-sanitize.js",
                    "app/bower_components/tv4/tv4.js",
                    "app/bower_components/objectpath/lib/ObjectPath.js",
                    "app/bower_components/angular-schema-form/dist/schema-form.js",
                    "app/bower_components/angular-schema-form/dist/bootstrap-decorator.js",
                    "app/bower_components/angular-gettext/dist/angular-gettext.js",
                    "app/bower_components/json3/lib/json3.js",
                    "app/bower_components/angular-loading-bar/build/loading-bar.js",
                    "app/bower_components/metisMenu/dist/metisMenu.js",
                    "app/bower_components/Chart.js/Chart.js",
                    "app/bower_components/intro.js/intro.js",
                    "app/bower_components/moment/min/moment.min.js",
                    "app/bower_components/toastr/toastr.min.js"
                ],
                dest: 'dist/bower_components/components.js'
            },
            css: {
                files: {
                    'dist/css/app.css': [
                        "app/bower_components/angular-bootstrap/ui-bootstrap-csp.css",
                        "app/bower_components/bootstrap/dist/css/bootstrap.min.css",
                        "app/app.css",
                        "app/bower_components/metisMenu/dist/metisMenu.min.css",
                        "app/bower_components/angular-loading-bar/build/loading-bar.min.css",
                        "app/bower_components/font-awesome/css/font-awesome.min.css",
                        "app/bower_components/intro.js/intro.css",
                        "app/bower_components/intro.js/themes/introjs-nassim.css",
                        "app/bower_components/toastr/toastr.min.css"
                    ]
                }
            },
            js_branch: {
                src: [
                    'app/app.js',
                    'app/app_routes.js',
                    'app/zetalib/**/*service.js',
                    'app/zetalib/general.js',
                    'app/zetalib/interceptors.js',
                    'app/shared/scripts/theme.js',
                    'app/shared/directives.js',
                    'app/components/**/*controller.js',
                    'app/components/**/*service.js',
                    "app/components/messaging/messaging_service.js",
                    "app/components/messaging/messaging.js"
                ],
                dest: 'dist/<%= grunt.branchname %>/app.js'
            },
            components_branch: {
                src: [
                    "app/bower_components/angular-i18n/angular-locale_tr.js",
                    "app/bower_components/angular-route/angular-route.min.js",
                    "app/bower_components/angular-cookies/angular-cookies.min.js",
                    "app/bower_components/angular-resource/angular-resource.min.js",
                    "app/bower_components/angular-bootstrap/ui-bootstrap.min.js",
                    "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
                    "app/bower_components/angular-sanitize/angular-sanitize.min.js",
                    "app/bower_components/tv4/tv4.js",
                    "app/bower_components/objectpath/lib/ObjectPath.js",
                    "app/bower_components/angular-schema-form/dist/schema-form.min.js",
                    "app/bower_components/angular-schema-form/dist/bootstrap-decorator.min.js",
                    "app/bower_components/angular-schema-form-datepicker/bootstrap-datepicker.min.js",
                    "app/bower_components/angular-gettext/dist/angular-gettext.min.js",
                    "app/bower_components/json3/lib/json3.min.js",
                    "app/bower_components/angular-loading-bar/build/loading-bar.min.js",
                    "app/bower_components/metisMenu/dist/metisMenu.min.js",
                    "app/bower_components/Chart.js/Chart.min.js",
                    "app/bower_components/intro.js/minified/intro.min.js",
                    "app/bower_components/moment/min/moment.min.js"
                ],
                dest: 'dist/<%= grunt.branchname %>/bower_components/components.js'
            },
            css_branch: {
                src: [
                    "app/bower_components/angular-bootstrap/ui-bootstrap-csp.css",
                    "app/bower_components/bootstrap/dist/css/bootstrap.min.css",
                    "app/app.css",
                    "app/bower_components/metisMenu/dist/metisMenu.min.css",
                    "app/bower_components/angular-loading-bar/build/loading-bar.min.css",
                    "app/bower_components/font-awesome/css/font-awesome.min.css",
                    "app/bower_components/intro.js/minified/intro.min.css",
                    "app/bower_components/intro.js/themes/introjs-nassim.css"
                ],
                dest: 'dist/<%= grunt.branchname %>/css/app.css'
            },
            docs: {
                src: ['docs/templates/index_head', 'docs/html/partials/api/**/*.html', 'docs/templates/index_tail'],
                dest: 'docs/html/partials/api/index.html'
            },
            docs_list: {
                src: ['docs/html/partials/api/**/index.html'],
                dest: 'docs/html/partials/api/list.html'
            }
        },
        watch: {
            dev: {
                files: ['app/**/*.js', 'app/**/**/*.js', 'app/components/**/*.html', 'app/main.html', 'Gruntfile.js', '!app/tmp/*.js', '!app/app.js'],
                tasks: ['env:dev', 'preprocess:dev', 'html2js:dev', 'default', 'watch:dev'],
                options: {
                    atBegin: false
                }
            },
            local_prod: {
                files: ['app/**/*.js', 'app/components/**/*.html', 'app/main.html', 'Gruntfile.js', '!app/tmp/*.js', '!app/app.js'],
                tasks: ['env:prod', 'preprocess:prod', 'nggettext_compile', 'concat:js', 'concat:css', 'concat:components', 'copy:local_prod', 'html2js:prod', 'uglify:dist'],
                options: {
                    atBegin: false
                }
            },
            min: {
                files: ['app/**/*.js', 'index.html', 'app/components/**/*.html'],
                tasks: ['karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist'],
                options: {
                    atBegin: true
                }
            }
        },
        nggettext_extract: {
            pot: {
                files: {
                    'po/template.pot': ['app/**/*.html']
                }
            }
        },
        nggettext_compile: {
            all: {
                files: {
                    'dist/shared/translations.js': ['po/*.po']
                }
            },
            dev: {
                files: {
                    'app/shared/translations.js': ['po/*.po']
                }
            },
            branch: {
                files: {
                    'dist/<%= grunt.branchname %>/shared/translations.js': ['po/*.po']
                }
            }
        },
        env: {
            options: {},
            dev: {
                NODE_ENV: 'DEVELOPMENT'
            },
            prod: {
                NODE_ENV: 'PRODUCTION'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'app'
                }
            },
            prod_server: {
                options: {
                    port: 8080,
                    base: 'dist'
                }
            }
        },
        preprocess: {
            dev: {
                files: {
                    'app/index.html': 'app/main.html',
                    'app/app.js': 'app/main.js'
                }
            },
            prod: {
                files: {
                    'dist/index.html': 'app/main.html',
                    'dist/app.js': 'app/main.js',
                },
                options: {
                    context: {
                        name: '<%= pkg.name %>',
                        version: '<%= pkg.version %>',
                        now: '<%= now %>',
                        ver: '<%= ver %>'
                    }
                }
            },
            prod_branch: {
                files: {
                    'dist/<%= grunt.branchname %>/index.html': 'app/main.html',
                    'dist/<%= grunt.branchname %>/app.js': 'app/main.js',
                },
                options: {
                    context: {
                        name: '<%= pkg.name %>',
                        version: '<%= pkg.version %>',
                        now: '<%= now %>',
                        ver: '<%= ver %>'
                    }
                }
            }
        },

        jsdoc: {
            dist: {
                src: [
                    "app/app.js",
                    "app/zetalib/interceptors.js",
                    "app/zetalib/form_service.js",
                    "app/shared/directives.js",
                    "app/components/auth/auth_controller.js",
                    "app/components/auth/auth_service.js",
                    "app/components/crud/crud_controller.js"
                ],
                options: {
                    destination: 'docs/html',
                    configure: 'node_modules/angular-jsdoc/common/conf.json',
                    template: 'node_modules/angular-jsdoc/angular-template',
                    //tutorial: 'tutorials',
                    readme: './docs/DOCS.md'
                }
            }
        },

        mrdoc: {
            custom: {
                src: 'api-docs-source',
                target: 'api-docs',
                options: {
                    title: 'Ulakbus UI',
                    readme: './docs/DOCS.md'
                    //theme: 'cayman'
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-mrdoc');

    grunt.registerTask('dev', ['env:dev', 'preprocess:dev', 'html2js:dev', 'default']);
    grunt.registerTask('test', ['bower', 'karma:continuous']);
    grunt.registerTask('api-docs', ['copy:for_api_docs', 'mrdoc']);
    grunt.registerTask('i18n', ['nggettext_extract', 'nggettext_compile']);
    grunt.registerTask('local_prod', ['bower', 'env:prod', 'preprocess:prod', 'nggettext_compile', 'concat:js', 'concat:css', 'concat:components', 'copy:local_prod', 'html2js:prod', 'uglify:dist', 'connect:prod_server', 'watch:local_prod']);
    grunt.registerTask('default', ['bower', 'env:prod', 'preprocess:prod', 'nggettext_compile', 'concat:js', 'concat:css', 'concat:components', 'copy:prod', 'html2js:prod', 'uglify:dist']);
    grunt.registerTask('branch', '', function () {
        // get branch name
        var branch = require('git-branch');
        grunt.branchname = branch.sync();
        grunt.task.run([
            'bower',
            'nggettext_compile:branch',
            'concat:js_branch',
            'concat:css_branch',
            'concat:components_branch',
            'copy:prod',
            'env:prod',
            'preprocess:prod_branch',
            'html2js:prod_branch',
            'uglify:branch'
        ]);
    });
};
