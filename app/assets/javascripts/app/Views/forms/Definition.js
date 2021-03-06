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
                '<td><input class="count" min="0" type="number" step="5" value="<%= count %>"/></td>',
                '<td><span class="calculatedProteins"><%= calculatedProteins %></span> (<%= proteins%>)</td>',
                '<td><span class="calculatedFats"><%= calculatedFats %></span> (<%= fats %>)</td>',
                '<td><span class="calculatedCarbohydrates"><%= calculatedCarbohydrates %></span> (<%= carbohydrates %>)</td>',
                '<td><span class="calculatedCalories"><%= calculatedCalories %></span> (<%= calories %>)</td>',
            '</tr>'
        ].join('')),

        getModalDialog: function () {
            this.showModal({
                headers: [
                    'Дата',
                    'Вiк',
                    'Білки(г)',
                    'Жири(г)',
                    'Вуглеводи(г)',
                    'ккал'
                ],
                title: 'Калорійнiсть'
            });
        },

        renderCaloriesTable: function () {
            this.productsCollection = this.getProductCollection();

            this.listenTo(this.productsCollection, 'sync', this.renderProducts.bind(this))
                .listenTo(this.productsCollection, 'product:updatedModel', this.updateProductView.bind(this))
                .listenTo(this.productsCollection, 'product:filteredContent', this.updateSearchResult.bind(this));

            this.productsCollection.length && this.productsCollection.trigger('sync');
        },

        updateSearchResult: function (searchContent) {
            clearTimeout(this.timeout);

            this.timeout = setTimeout(this.updateSearchTable.bind(this, searchContent), 300);
        },

        updateSearchTable: function (searchContent) {
            if (this.prevSearchResult !== searchContent) {
                this.prevSearchResult = searchContent;
                this.$searchContent.html(searchContent);
            }
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
                    minLength: app.constants.MIN_SEARCH_LENGTH
                }, {
                    name: 'products',
                    source: this.searchCallback.bind(this)
                });

            this.$search.bind('typeahead:select', this.showChangedProduct.bind(this));
            this.$search.bind('typeahead:autocomplete', this.autocomplete.bind(this));
            this.$search.on('input', this.checkSearchField.bind(this));
        },

        checkSearchField: function (e) {
            if (e.target.value.length < app.constants.MIN_SEARCH_LENGTH) {
                this.clearSearchResult();
                clearTimeout(this.timeout);
            }
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
            var result = this.productsCollection.getFilteredNames(name, this.template);

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
            this.clearSearchResult();
            this.$search.typeahead('val', '');
        },

        clearSearchResult: function () {
            this.$searchContent.empty();
        },

        updateProductView: function (model) {
            this.updateProduct(model.get('id'), model.toJSON());
        },

        getProductCollection: function () {
            var productsList = app.instances.productsData,
                collection = new app.collections.ProductCollection(productsList);

            if (!productsList || !productsList.length) {
                collection.fetch();
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
            this.$search.off('input');
        }

    });

} (app));