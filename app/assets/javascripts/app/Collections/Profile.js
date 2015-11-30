;(function (app) {

    app.collections.ProfileCollection = Backbone.Collection.extend({

        model: app.models.ProfileModel,

        url: '/statistic'

    });
}(app));