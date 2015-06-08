;(function (app) {

    app.views.PhysicalPreparednessView = app.views.PhysicalTabView.extend({

        events: {
            'click .toggle-show': 'toggleShow'
        },

        onInit: function () {
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
        },

        toggleShow: function () {
            this.$('fieldset.lead').toggle(1000);
        },

        cacheElements: function () {
            this.$toggleShow = this.$('.toggle-show');
            this.$lead = this.$('fieldset.lead');
        },

        afterRender: function () {

        }

    });

} (app));