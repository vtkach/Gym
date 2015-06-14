;(function (app) {

    app.views.PhysicalPreparednessView = app.views.PhysicalTabView.extend({

        afterRender: function () {
            var bindFields = [
                "pushups",
                "raising",
                "jumplength",
                "jumpheight",
                "estapheta",
                "coopertest",
                "inclinebody",
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
                        return model.calculate(attr, val);
                        //TODO add valid converters for calculations
                    }

                    return val;
                },

                elAttribute: 'class'

            }];
        }

    });

} (app));