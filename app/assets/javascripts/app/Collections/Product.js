;(function (app) {

    app.collections.ProductCollection = Backbone.Collection.extend({

        url: '/products',

        model: app.models.ProductRowModel,

        calculateCalories: function () {
            var startValues = {
                    proteins: 0,
                    fats: 0,
                    calories: 0,
                    carbohydrates: 0
                },
                result;

            result = this.reduce(this.calculateCallback, startValues);

            return result;
        },

        parse: function (data) {
            app.instances.productsData = data;
            return data;
        },

        calculateCallback: function (accum, model) {
            var data;

            if (model.get('count')) {
                data = model.toJSON();

                accum.proteins += data.calculatedProteins;
                accum.fats += data.calculatedFats;
                accum.calories += data.calculatedCalories;
                accum.carbohydrates += data.calculatedCarbohydrates;
            }

            return accum;
        },

        getFilteredNames: function (name, callback) {
            var autocompleteValues = [],
                filteredContent = '';

            this.every(function (model) {
                var attributes;

                if (this.checkName(model, name)) {
                    attributes = model.attributes;
                    autocompleteValues.push(attributes.name);
                    filteredContent += callback(attributes);
                }

                return autocompleteValues.length <= app.constants.SEARCH_RESULT_COUNT;
            }, this);

            this.trigger('product:filteredContent', filteredContent);
            return autocompleteValues;
        },

        checkName: function (model, name) {
            var substringRegexp = new RegExp(name, 'i');

            return substringRegexp.test(model.get('name'));
        },

        getModelByName: function (name) {
            return this.find(function (model) {
                return this.checkName(model, name);
            }, this);
        },

        setDefaultValues: function () {
            this.each(this.resetModel, this);
        },

        resetModel: function (model) {
            if (model.get('count')) {
                model.calculate(0);

                this.trigger('product:updatedModel', model);
            }
        }

    });

} (app));