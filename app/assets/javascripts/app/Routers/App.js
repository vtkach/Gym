;(function (app) {

    app.routers.AppRouter = Backbone.Router.extend({

        currentView: null,

        mainView: null,

        routes: {
            'infoTab/:template': 'checkUserRights',
            'accessed/:action': 'renderTemplate',
            'register': 'onRegister',
            '': 'renderByDefault'
        },

        initialize: function () {
            _.bindAll(this, 'loadUserData', 'renderByDefault');
            app.instances.session = new app.models.SessionModel();
            app.instances.user = new app.models.UserModel();
            app.instances.session.checkSession().done(this.loadUserData);
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

        checkUserRights: function (template) {
            this.currentTemplate = template;
            app.instances.session.checkSession()
                .done(this.renderByPage.bind(this, template))
                .fail(this.renderByDefault);

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
        }

    });

} (app));