;(function (app) {

    app.views.PhysicalHealthView = app.views.PhysicalTabView.extend({

        railsRoute: '/physical_health/'

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
            }
        }
    });

} (app));

