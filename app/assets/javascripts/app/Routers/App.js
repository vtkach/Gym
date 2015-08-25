;(function (app) {

    app.routers.AppRouter = app.routers.BaseRouter.extend({

        currentSubView: null,

        currentView: null,

        mainView: null,

        subView: '',

        page: '',

        settings: {
            'profile': {
                instance: 'profile',
                view: 'Profile'
            },
            'notebook-for-exercices': {
                model: 'Note',
                view: 'Notes'
            }
        },

        routes: {
            'infoTab/my-phis-state/:tpl': 'renderTplIntoPhisState',
            'infoTab/:template': 'checkRightForInfoTab',
            'accessed/:action': 'renderTemplate',
            'register': 'onRegister',
            '': 'renderByDefault'
        },

        initialize: function () {
            app.instances.session = this.factoryMethod('Session', 'model');
            app.instances.profile = this.factoryMethod('Profile', 'model');
            app.instances.user = this.factoryMethod('User', 'model');
            this.loadUserData();
        },

        convertToClassName: function (template) {
            var arr = template.split('-');

            return arr.map(this.capitalize).join('');
        },

        checkRightForInfoTab: function (tpl) {
            this.checkUserRights(tpl)
                .done(this.renderByPage.bind(this, tpl))
                .fail(this.renderByDefault.bind(this));
        },

        renderSubPhysView: function (template) {
            var templateToClassName = this.convertToClassName(template),
                url = ['/', template.replace(/-/g, '_'), '/'].join(''),
                options = {
                    className: 'form-group ' + template,
                    model: this.factoryMethod(templateToClassName, 'model', {
                        urlPart: url
                    }),
                    tagName: 'fieldset',
                    tplName: template
                }, list = $('.nav.nav-pills.nav-stacked');

            if (this.subView !== template) {
                this.currentSubView && this.currentSubView.close();
                this.currentSubView = this.factoryMethod(templateToClassName, 'view', options);
                this.currentView.$('.form-container').html(this.currentSubView.render().el);
                this.subView = template;
                list.find('li').removeClass('active');
                list.find('.' + template).addClass('active');
            }
        },

        renderTplIntoPhisState: function (template) {
            this.checkUserRights('my-phis-state')
                .fail(this.renderByDefault.bind(this))
                .done(function () {
                    this.renderByPage('my-phis-state');
                    this.renderSubPhysView(template);
                }.bind(this));
        },

        loadUserData: function () {
            app.instances.user.loadUser();
        },

        checkExistViews: function (route) {
            !this.mainView && this.createMainView();
            !this.currentView &&  this.renderTemplate(route);
            this.page = route;
        },

        clear: function () {
            if (this.currentSubView) {
                this.currentSubView.close();
                this.subView = null;
            }
            this.currentView && this.currentView.close();
            !this.mainView && this.createMainView();
        },

        renderContent: function () {
            this.mainView.$mainContainer.html(this.currentView.render().el);
        },

        checkUserRights: function () {
            return app.instances.session.checkSession();
        },

        createMainView: function () {
            var options = {
                model: app.instances.user
            };

            this.mainView = this.factoryMethod('Main', 'view', options);
            this.mainView.cacheElements();
        },

        renderByPage: function (template) {
            if (this.page !== template) {
                this.clear();
                this.currentView = this.generateViewInstance(template);
                this.renderContent();
                if (template === 'my-phis-state') {
                    this.renderSubPhysView('physical-state');
                }
                this.page = template;
            }
        },

        generateViewInstance: function (template) {
            var settings = this.settings[template],
                options,
                model,
                view;

            if (settings) {
                model = app.instances[settings.instance] || this.factoryMethod(settings.model, 'model');
                view = settings.view;
            }

            options = {
                model: model || this.factoryMethod('Base', 'model'),
                className: 'fade-in ' + template,
                tplName: template
            };

            return this.factoryMethod(view || 'InfoTab', 'view', options);
        },

        renderByDefault: function () {
            this.clear();
            this.navigate('accessed/home', { trigger: true });
        },

        onRegister: function () {
            var options = {
                model: this.factoryMethod('Registration', 'model'),
                tplName: 'register'
            };

            this.clear();
            this.currentView = this.factoryMethod('Registration', 'view', options);
            this.renderContent();
        },

        renderTemplate: function (route) {
            var options = {
                model: this.factoryMethod('UserActions', 'model'),
                tplName: route
            };

            this.subView = '';
            this.currentSubView && this.currentSubView.close();
            this.currentSubView = null;
            this.page = route;
            this.clear();
            this.currentView = this.factoryMethod('UserActions', 'view', options);
            this.renderContent();
        }

    });

} (app));