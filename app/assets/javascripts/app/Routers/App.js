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
            app.instances.session = this.factoryMethod('model', 'Session');
            app.instances.profile = this.factoryMethod('model', 'Profile');
            app.instances.user = this.factoryMethod('model', 'User');
            app.instances.session.checkSession().done(this.loadUserData);
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
                    model: this.factoryMethod('model', templateToClassName, {
                        urlPart: url
                    }),
                    tagName: 'fieldset',
                    tplName: template
                }, list = $('.nav.nav-pills.nav-stacked');

            if (this.subView !== template) {
                this.currentSubView && this.currentSubView.close();
                this.currentSubView = this.factoryMethod('view', templateToClassName, options);
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
            app.instances.user
                .loadUser()
                .then(function (userData) {
                }, function () {
                    debugger;
                }.bind(app.instances.user));
        },

        checkExistViews: function (route) {
            !this.mainView && this.createMainView();
            !this.currentView &&  this.renderTemplate(route);
            this.page = route;
        },

        clear: function () {
            this.currentView && this.currentView.close();
            !this.mainView && this.createMainView();
        },

        renderContent: function () {
            this.mainView.$mainContainer.html(this.currentView.render().el);
        },

        setState: function (xhr, state) {
            this.sessionStatus = state;
        },

        checkUserRights: function () {
            return app.instances.session.checkSession()
                .always(this.setState.bind(this));
        },

        createMainView: function () {
            var options = {
                model: app.instances.user
            };

            this.mainView = this.factoryMethod('view', 'Main', options);
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
                model = app.instances[settings.instance] || this.factoryMethod('model', settings.model);
                view = settings.view;
            }

            options = {
                model: model || this.factoryMethod('model', 'Base'),
                tplName: template
            };

            return this.factoryMethod('view', view || 'InfoTab', options);
        },

        renderByDefault: function () {
            this.createMainView();
            this.navigate('accessed/home', { trigger: true });
        },

        //TODO move this stuff to some "DRY" method
        onRegister: function () {
            var options = {
                model: this.factoryMethod('model', 'Registration'),
                tplName: 'register'
            };

            this.clear();
            this.currentView = this.factoryMethod('view', 'Registration', options);
            this.renderContent();
        },

        renderTemplate: function (route) {
            var options = {
                model: this.factoryMethod('model', 'UserActions'),
                tplName: route
            };

            this.subView = '';
            this.page = route;
            this.clear();
            this.currentView = this.factoryMethod('view', 'UserActions', options);
            this.renderContent();
        }

    });

} (app));