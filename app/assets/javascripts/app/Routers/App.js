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
            'views/:action/:template': 'checkUserRights',
            '': 'renderByDefault'
        },

        initialize: function () {
            app.instances.user = new app.models.UserModel();
            _.bindAll(this, 'renderByDefault');
        },

        access: function (route) {
            return _.contains(this.accessedRoutes, route);
        },

        isNotCurrentTemplate: function (template) {
            return this.currentTemplate !== template;
        },

        checkUserRights: function (action, template) {
            if (this.isNotCurrentTemplate(template) && !this.access(template)) {
                this.currentTemplate = template;
                app.instances.user.save().then(
                    this.renderByPage.bind(this, action, template),
                    this.renderByDefault
                );
            } else {
                this.renderByPage(action, template);
            }
        },

        createMainView: function () {
            this.mainView = new app.views.MainView({
                model: app.instances.user
            });

            this.mainView.cacheElements();
        },

        renderByPage: function (action, template) {
            this.currentView && this.currentView.close();
            this.currentView = new app.views[action + 'View']({
                tplName: template
            });

            !this.mainView && this.createMainView();
            this.mainView.$mainContainer.html(this.currentView.render().el);
        },

        renderByDefault: function () {
            this.createMainView();
            this.navigate('views/UserActions/home', { trigger: true });
        }

    });

} (app));