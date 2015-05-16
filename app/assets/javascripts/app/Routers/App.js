;(function (app) {

    app.routers.AppRouter = Backbone.Router.extend({

        currentView: null,

        mainView: null,

        accessedRoutes: [
            'register',
            'signin',
            'home'
        ],

        routes: {
            'infoTab/:template': 'checkUserRights',
            'accessed/:action': 'renderTemplate',
            '': 'renderByDefault'
        },

        initialize: function () {
            app.instances.user = new app.models.UserModel();
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
            if (this.isNotCurrentTemplate(template) && !this.access(template)) {
                this.currentTemplate = template;
                app.instances.user.checkSession().then(
                    this.renderByPage.bind(this, template),
                    this.renderByDefault.bind(this)
                );
            } else {
                this.renderByPage(template);
            }
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
                tplName: template
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