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

            result = this.reduce(function (accum, model) {
                var data;

                if (model.get('count')) {
                    data = model.toJSON();

                    accum.calculatedProteins += data.calculatedProteins;
                    accum.calculatedFats += data.calculatedFats;
                    accum.calculatedCalories += data.calculatedCalories;
                    accum.calculatedCarbohydrates += data.calculatedCarbohydrates;
                }

                return accum;
            }, startValues);

            return result;
        }

    });

} (app));