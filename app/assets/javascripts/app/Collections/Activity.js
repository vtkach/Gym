;(function (app) {

    app.collections.ActivityCollection = Backbone.Collection.extend({

        model: app.models.ActivityRowModel

    });

} (app));