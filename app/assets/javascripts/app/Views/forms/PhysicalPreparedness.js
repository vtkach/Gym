;(function (app) {

    app.views.PhysicalPreparednessView = app.views.PhysicalTabView.extend({

        classes: [
            'danger-state',
            'low-danger-state', //F37020
            'low-success-state', //FEF984
            'higher-success'
        ],

        states: [
            'Низька',
            "Нижче за середній",
            "Середній",
            "Високий"
        ],

        getModalDialog: function () {
            this.showModal({
                headers: [
                    'Дата',
                    'Вiк',
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

        binding: function () {
            this.beforeBinding();
            this.updateAge();

            if (!app.instances.profile.get('age')) {
                this.listenTo(app.instances.profile, 'change:age', this.bindPreparedness);
            } else {
                this.bindPreparedness();
            }

            this.extendBinding();
        },

        bindPreparedness: function () {
            var bindFields = [
                'pushUps',
                'raising',
                'jumpLength',
                'shuttleRunning',
                'running',
                'inclineBody',
                'uniformRunning',
                'pull',
                'inclines'
            ];

            _.each(bindFields, this.eachBinding, this);
            this.constructor.bindings.age = '[name=age]';
            app.views.PhysicalTabView.prototype.binding.call(this);
        },

        eachBinding: function (elem) {
            this.constructor.bindings[elem] = [{
                converter: this.generalConverter.bind(this, 'classes'),
                selector: 'td[name="' + elem + '"]',
                elAttribute: 'class'
            }, {
                converter: this.generalConverter.bind(this, 'states'),
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
                return [_.first(rangesForAttribute).min, ' - ', _.last(rangesForAttribute).min].join('');
            }
            return val;
        },

        generalConverter: function (neededField, dir, val, attr, model) {
            if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                return this[neededField][model.calculateAttr(attr, parseFloat(val))];
            }

            return val;
        }

    }, {
        bindings: {}
    });

} (app));