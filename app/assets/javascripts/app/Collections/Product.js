;(function (app) {

    app.collections.ProductCollection = Backbone.Collection.extend({

        url: '/products',

        model: app.models.ProductRowModel

    });

} (app));