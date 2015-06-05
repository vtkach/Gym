;(function (app) {

    app.views.PhysicalPreparednessView = app.helpers.FormView.extend({

        onInit: function () {
            var bindFields = [
                "pushups",
                "raising",
                "jumpblength",
                "jumpbheight",
                "estapheta",
                "coopertest",
                "straightlegs",
                "flamingotest",
                "inclines"
            ];

            this.constructor.bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');
            _.each(bindFields, this.eachBinding, this);
        },

        eachBinding: function (elem) {

            this.constructor.bindings[elem] = [{

                selector: 'input[name="' + elem + '"]'

            }, {

                selector: 'td[name="' + elem + '"]',

                converter: function (dir, val, attr, model) {
                    if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                        //model.RANGES[attr]
                        //TODO add valid converters for calculations
                    }
                },

                elAttribute: 'class'

            }];

        }

    });

} (app));