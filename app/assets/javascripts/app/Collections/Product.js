;(function (app) {

    app.collections.ProductCollection = Backbone.Collection.extend({

        url: '/calories.json',

        model: app.models.ProductRowModel

    });

} (app));