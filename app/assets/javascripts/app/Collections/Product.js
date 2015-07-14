;(function (app) {

    app.collections.ProductCollection = Backbone.Collection.extend({

        url: '/products',

        model: app.models.ProductRowModel,

        calculateCalories: function () {
            var startValues = {
                    calculatedProteins: 0,
                    calculatedFats: 0,
                    calculatedCalories: 0,
                    calculatedCarbohydrates: 0
                },
                result;

            result = this.reduce(this.calculateCallback, startValues);

            return result;
        },

        calculateCallback: function (accum, model) {
            var data;

            if (model.get('count')) {
                data = model.toJSON();

                accum.calculatedProteins += data.calculatedProteins;
                accum.calculatedFats += data.calculatedFats;
                accum.calculatedCalories += data.calculatedCalories;
                accum.calculatedCarbohydrates += data.calculatedCarbohydrates;
            }

            return accum;
        },

        getFilteredNames: function (name) {
            var result = [];

            this.every(function (model) {
                if (this.checkName(model, name)) {
                    result.push(model.get('name'));
                }

                return result.length < 11;
            }, this);

            return result;
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
            if (model.get('count') > 0) {
                model.calculate(0);

                this.trigger('product:updatedModel', model);
            }
        }

    });

} (app));