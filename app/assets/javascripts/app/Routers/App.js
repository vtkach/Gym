;(function (app) {

    app.routers.AppRouter = Backbone.Router.extend({

        currentSubView: null,

        currentView: null,

        mainView: null,

        routes: {
            'infoTab/my-phis-state/:tpl': 'renderTplIntoPhisState',
            'infoTab/profile': 'openProfile',
            'infoTab/:template': 'checkUserRights',
            'accessed/:action': 'renderTemplate',
            'register': 'onRegister',
            '': 'renderByDefault'
        },

        initialize: function () {
            _.bindAll(this, 'loadUserData', 'renderByDefault');
            app.instances.session = new app.models.SessionModel();
            app.instances.profile = new app.models.ProfileModel();
            app.instances.user = new app.models.UserModel();
            app.instances.session.checkSession().done(this.loadUserData);
        },

        capitalize: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        },

        convertToClassName: function (template) {
            var arr = template.split('-');

            return arr.map(this.capitalize).join('');
        },

        renderTplIntoPhisState: function (template) {
            var templateToClassName = this.convertToClassName(template);

            this.checkUserRights('my-phis-state');
            if (this.sessionStatus === 'success') {
                this.currentSubView = new app.views[templateToClassName + 'View']({
                    className: 'form-group ' + template,
                    model: app.instances.profile,
                    tagName: 'fieldset',
                    tplName: template
                });

                this.currentView.$('.form-container').html(this.currentSubView.render().el);
            }
        },

        onRegister: function () {
            this.clear();
            this.currentView = new app.views.RegistrationView({
                model: new app.models.RegistrationModel,
                tplName: 'register'
            });
            this.renderContent();
        },

        loadUserData: function () {
            app.instances.user
                .loadUser()
                .then(function (userData) {
                        console.log('success', userData);
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

        renderTemplate: function (route) {
            this.clear();
            this.currentView = new app.views.UserActionsView({
                model: new app.models.UserActionsModel({ route: route }),
                tplName: route
            });
            this.renderContent();
        },

        setState: function (xhr, state) {
            this.sessionStatus = state;
        },

        checkUserRights: function (template) {
            if (this.currentTemplate !== template) {
                this.currentTemplate = template;
                app.instances.session.checkSession()
                    .done(this.renderByPage.bind(this, template))
                    .fail(this.renderByDefault)
                    .always(this.setState.bind(this));
            }
        },

        createMainView: function () {
            this.mainView = new app.views.MainView({
                model: app.instances.user
            });
            this.mainView.cacheElements();
        },

        renderByPage: function (template) {
            this.clear();
            this.currentView = new app.views.InfoTabView({
                tplName: template,
                //TODO: remove this
                model: new app.helpers.BaseModel()
            });
            this.renderContent();
        },

        renderByDefault: function () {
            this.createMainView();
            this.navigate('accessed/home', { trigger: true });
        },

        openProfile: function () {
            this.clear();
            this.currentView = new app.views.ProfileView({
                model: app.instances.profile,
                tplName: 'profile'
            });
            this.renderContent();
        }

    });

} (app));