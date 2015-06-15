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

                elAttribute: 'class',

                converter: this.bindingConverter

            }];
        },

        bindingConverter: function (dir, val, attr, model) {
            if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                return model.calculate(attr, val);
            }

            return val;
        }

    }, {
        profileBindings: {
            gender: {
                selector: '[name=gender]',
                converter: function (dir, val) {
                    var dict = {
                        male: 'Мужчина',
                        female: 'Женщина'
                    };

                    if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                        return dict[val];
                    }

                    return val;
                }
            },

            firstName: '[name=firstName]',
            lastName: '[name=lastName]',
            surname: '[name=surname]'
        }
    });

} (app));