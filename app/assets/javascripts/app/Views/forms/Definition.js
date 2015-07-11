;(function (app) {

    app.views.DefinitionView = app.views.PhysicalTabView.extend({

        afterRender: function () {
            app.views.PhysicalTabView.prototype.afterRender.apply(this, arguments);
            this.renderCaloriesTable();
        },

        renderCaloriesTable: function () {
            var viewFactory = new Backbone.CollectionBinder.ViewManagerFactory(this.getProductView);

            this.productsCollection = this.getProductCollection();

            this._productCollectionBinder = new Backbone.CollectionBinder(viewFactory);
            this._productCollectionBinder.bind(this.productsCollection, this.$('.calories tbody'));
        },

        getProductCollection: function () {
            var collection = app.instances.productsCollection;

            if (!collection || !collection.length) {
                collection = new app.collections.ProductCollection();
                collection.fetch();
                app.instances.productsCollection = collection;
            }

            return collection;
        },

        getProductView: function (model) {
            return new app.views.ProductRowView({
                tplName: 'product-row',
                model: model
            });
        },

        onClose: function () {
            app.views.PhysicalTabView.prototype.onClose.apply(this, arguments);
            this._productCollectionBinder.unbind();
        }

    });

} (app));