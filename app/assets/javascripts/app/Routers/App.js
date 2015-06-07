;(function (app) {

    app.routers.AppRouter = app.routers.BaseRouter.extend({

        currentSubView: null,

        currentView: null,

        mainView: null,

        routes: {
            'infoTab/my-phis-state/:tpl': 'renderTplIntoPhisState',
            'infoTab/profile': 'openProfile',
            'infoTab/notebook-for-exercices': 'openNotebook',
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
                .fail(this.renderByDefault);
        },

        renderSubPhysView: function (template) {
            var templateToClassName = this.convertToClassName(template),
                options = {
                    className: 'form-group ' + template,
                    model: app.instances.profile,
                    profile: app.instances.profile,
                    tagName: 'fieldset',
                    tplName: template
                };

            this.currentSubView = this.factoryMethod('view', templateToClassName, options);
            this.currentView.$('.form-container').html(this.currentSubView.render().el);
        },

        renderTplIntoPhisState: function (template) {
            this.checkUserRights('my-phis-state')
                //.fail(this.renderByDefault)
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
            var options = {
                model: this.factoryMethod('model', 'Base'),
                tplName: template
            };

            this.clear();
            this.currentView = this.factoryMethod('view', 'InfoTab', options);
            this.renderContent();
            if (template === 'my-phis-state') {
                this.renderSubPhysView('body-index');
            }
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
                //model: new app.models.UserActionsModel({ route: route }),
                model: this.factoryMethod('model', 'UserActions'),
                tplName: route
            };

            this.clear();
            this.currentView = this.factoryMethod('view', 'UserActions', options);
            this.renderContent();
        },

        openProfile: function () {
            var options = {
                model: app.instances.profile,
                tplName: 'profile'
            };

            this.clear();
            this.currentView = this.factoryMethod('view', 'Profile', options);
            this.renderContent();
        },

        openNotebook: function () {
            var options = {
                model: this.factoryMethod('model', 'Note'),
                tplName: 'notebook-for-exercices'
            };

            this.clear();
            this.currentView = this.factoryMethod('view', 'Notes', options);
            this.renderContent();
        }

    });

} (app));