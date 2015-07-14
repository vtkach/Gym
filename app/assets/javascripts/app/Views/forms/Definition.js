;(function (app) {

    app.views.DefinitionView = app.views.PhysicalTabView.extend({

        afterRender: function () {
            app.views.PhysicalTabView.prototype.afterRender.apply(this, arguments);
            this.renderCaloriesTable();
            this.initSearch();
        },

        onInit: function () {
            app.views.PhysicalTabView.prototype.onInit.apply(this, arguments);

            this.extendEvents({
                'input .count': 'changedProductCount',
                'click .reset-search': 'resetSearchResult',
                'click .reset': 'reset'
            });
        },

        template: _.template([
            '<tr data-id="<%= id %>">',
                '<td><%= name %></td>',
                '<td><input class="count" min="0" type="number" value="<%= count %>"/></td>',
                '<td><span class="calculatedProteins"><%= calculatedProteins %></span> (<%= proteins%>)</td>',
                '<td><span class="calculatedFats"><%= calculatedFats %></span> (<%= fats %>)</td>',
                '<td><span class="calculatedCarbohydrates"><%= calculatedCarbohydrates %></span> (<%= carbohydrates %>)</td>',
                '<td><span class="calculatedCalories"><%= calculatedCalories %></span> (<%= calories %>)</td>',
            '</tr>'
        ].join('')),

        renderCaloriesTable: function () {
            this.productsCollection = this.getProductCollection();

            this.listenTo(this.productsCollection, 'sync', this.renderProducts.bind(this));
            this.listenTo(this.productsCollection, 'product:updatedModel', this.updateProductView.bind(this));
            this.productsCollection.length && this.productsCollection.trigger('sync');
        },

        renderProducts: function () {
            var content;

            content = this.productsCollection.reduce(this.generateProduct, '', this);
            this.$('.calories tbody').html(content);
        },

        generateProduct: function (memo, model) {
            return memo + this.template(model.toJSON());
        },

        initSearch: function () {
            this.$searchContent = this.$('.search-content tbody');

            this.$search = this.$('.search').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: this.searchCallback.bind(this)
            });

            this.$search.bind('typeahead:select', this.showChangedProduct.bind(this));
            this.$search.bind('typeahead:autocomplete', this.autocomplete.bind(this));
        },

        showChangedProduct: function (e, name) {
            var model = this.productsCollection.getModelByName(name);

            this.$searchContent.html(this.template(model.toJSON()));
        },

        autocomplete: function (e, name) {
            this.$search.typeahead('close');

            this.showChangedProduct(e, name);
        },

        searchCallback: function (name, pluginCallback) {
            var result = this.productsCollection.getFilteredNames(name);

            pluginCallback(result);
        },

        changedProductCount: function (e) {
            var $el = $(e.target),
                value = $el.val(),
                id = $el.closest('[data-id]').data().id,
                model = this.productsCollection.get(id);

            model.calculate(value);
            this.updateProduct(id, model.toJSON());
            this.calculateTotalCalories();
        },

        reset: function () {
            this.productsCollection.setDefaultValues();
            this.resetSearchResult();
            this.model.resetToDefaults();
        },

        resetSearchResult: function () {
            this.$searchContent.empty();
            this.$search.typeahead('val', '');
        },

        updateProductView: function (model) {
            this.updateProduct(model.get('id'), model.toJSON());
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

        updateProduct: function (id, data) {
            var $el = this.$('[data-id=' + id + ']');

            $el.find('.count').val(data.count);
            $el.find('.calculatedProteins').html(data.calculatedProteins);
            $el.find('.calculatedFats').html(data.calculatedFats);
            $el.find('.calculatedCalories').html(data.calculatedCalories);
            $el.find('.calculatedCarbohydrates').html(data.calculatedCarbohydrates);
        },

        calculateTotalCalories: function () {
            var totalCalories = this.productsCollection.calculateCalories();

            this.model.set(totalCalories);
        },

        onClose: function () {
            app.views.PhysicalTabView.prototype.onClose.apply(this, arguments);

            this.$search.unbind();
            this.$search.typeahead('destroy');
        }

    });

} (app));