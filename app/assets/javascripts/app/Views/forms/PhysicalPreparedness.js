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

        getModalDialog: function () {
            this.showModal({
                headers: [
                    'Згинання і розгинання рук',
                    'Піднімання в сід за 1 хв (разів)',
                    'Стрибок у довжину з місця (см)',
                    'Стрибок в висоту з місця (см)',
                    '«Естафетний тест» (см)',
                    '12-хвилиний тест Купера (м)',
                    'Піднімання прямих ніг під кутом 90º лежачі на спині за 30 с (разів)',
                    'Тест «Фламінго» (кількість спроб)',
                    'Нахил тулуба вперед з положення сидячи (см)'
                ],
                title: 'Фізична підготовленість'
            });
        },

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
            this.constructor.bindings.age = '[name=age]';
            app.views.BaseView.prototype.binding.call(this);
            this.initDatePicker();
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
                return this.states[model.calculateAttr(attr, val)];
            }

            return val;
        },

        bindingConverter: function (dir, val, attr, model) {
            if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                return this.classes[model.calculateAttr(attr, val)];
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
            surname: '[name=surname]',
            age: '[name=age]'
        },
        bindings: {}
    });

} (app));