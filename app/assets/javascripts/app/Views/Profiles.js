;(function (app) {

    app.views.ProfilesView = Backbone.View.extend({

        initialize: function () {
            var viewFactory = new Backbone.CollectionBinder.ViewManagerFactory(this.getProfileView);
            this._collectionBinder = new Backbone.CollectionBinder(viewFactory);
            this.collection = new app.collections.ProfileCollection();
            this.listenTo(this.collection, 'reset', this.dispatch);
            this.collection.fetch({
                reset: true
            });
        },

        dispatch: function () {
            Backbone.trigger('receive-users');
        },

        getProfileView: function (model) {
            return new app.views.ShowProfile({
                tplName: 'profile-statistic',
                model: model
            });
        },

        getTemplate: function (templateName) {
            var template = document.querySelector('#' + templateName);

            return document.importNode(template.content, true);
        },

        render: function () {
            this.$el.html(this.getTemplate('profiles'));
            this._collectionBinder.bind(this.collection, this.$('tbody'));

            return this;
        }

    });

}(app));