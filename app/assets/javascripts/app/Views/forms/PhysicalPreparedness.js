;(function (app) {

    app.views.PhysicalPreparednessView = app.views.PhysicalTabView.extend({

        classes: [
            'danger-state',
            'low-danger-state', //F37020
            'low-success-state', //FEF984
            'success-state', //C8FD87
            'higher-success'
        ],

        states: [
            'Низька',
            "Нижче за середній",
            "Середній",
            "Вище за середній",
            "Високий"
        ],

        afterRender: function () {
            var bindFields = [
                "pushUps",
                "raising",
                "jumpLength",
                "jumpHeight",
                "cooperTest",
                "inclineBody",
                "flamingoTest",
                'estafeta',
                "inclines"
            ];

            _.each(bindFields, this.eachBinding, this);
            app.views.BaseView.prototype.binding.call(this);
        },

        eachBinding: function (elem) {
            this.constructor.bindings[elem] = [{
                converter: this.bindingConverter.bind(this),
                selector: 'td[name="' + elem + '"]',
                elAttribute: 'class'
            }, {
                converter: this.stateConverter.bind(this),
                selector: 'td[name="' + elem + '"]'
            }, {
                selector: 'input[name="' + elem + '"]'
            }, {
                converter: this.popoverConverter.bind(this),
                selector: 'input[name="' + elem + '"]',
                elAttribute: 'placeholder'
            }];
        },

        popoverConverter: function (dir, val, attr, model) {
            var profile = app.instances.profile,
                rangesForAttribute = model.RANGES[profile.get('gender')][attr][profile.get('age')];

            if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                return [rangesForAttribute[0].min, ' - ', rangesForAttribute[4].max].join('');
            }

            return val;
        },

        stateConverter: function (dir, val, attr, model) {
            if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                return this.states[model.calculate(attr, val)];
            }

            return val;
        },

        bindingConverter: function (dir, val, attr, model) {
            if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                return this.classes[model.calculate(attr, val)];
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
        },
        bindings: {}
    });

} (app));