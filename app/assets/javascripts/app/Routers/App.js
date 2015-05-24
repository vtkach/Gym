;(function (app) {

    app.routers.AppRouter = Backbone.Router.extend({

        currentView: null,

        mainView: null,

        accessedRoutes: [
            'signin',
            'home'
        ],

        routes: {
            'infoTab/:template': 'checkUserRights',
            'accessed/:action': 'renderTemplate',
            'register': 'onRegister',
            '': 'renderByDefault'
        },

        initialize: function () {
            app.instances.session = new app.models.SessionModel();
            app.instances.user = new app.models.UserModel();
            app.instances.session.checkSession().then(
                this.loadUserData.bind(this),
                function () {
                    console.warn('Session was expired');
                }
            );
        },

        onRegister: function () {
            this.currentView && this.currentView.close();
            !this.mainView && this.createMainView();

            this.currentView = new app.views.RegistrationView({
                model: new app.models.RegistrationModel,
                tplName: 'register'
            });
            this.mainView.$mainContainer.html(this.currentView.render().el);
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

        renderTemplate: function (route) {
            this.currentView && this.currentView.close();
            !this.mainView && this.createMainView();

            this.currentView = new app.views.UserActionsView({
                model: new app.models.UserActionsModel({ route: route }),
                tplName: route
            });
            this.mainView.$mainContainer.html(this.currentView.render().el);
        },

        access: function (route) {
            return _.contains(this.accessedRoutes, route);
        },

        isNotCurrentTemplate: function (template) {
            return this.currentTemplate !== template;
        },

        checkUserRights: function (template) {
            this.currentTemplate = template;
            app.instances.session.checkSession()
                .done(this.renderByPage.bind(this, template))
                .fail(this.renderByDefault.bind(this));

        },

        createMainView: function () {
            this.mainView = new app.views.MainView({
                model: app.instances.user
            });
            this.mainView.cacheElements();
        },

        renderByPage: function (template) {
            this.currentView && this.currentView.close();
            this.currentView = new app.views.InfoTabView({
                tplName: template,
                //TODO: remove this
                model: new app.helpers.BaseModel()
            });

            !this.mainView && this.createMainView();
            this.mainView.$mainContainer.html(this.currentView.render().el);
        },

        renderByDefault: function () {
            this.createMainView();
            this.navigate('accessed/home', { trigger: true });
        }

    });

} (app));