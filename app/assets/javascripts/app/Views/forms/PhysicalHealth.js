;(function (app) {

    app.views.PhysicalHealthView = app.views.PhysicalTabView.extend({



    }, {
        profileBindings: {
            gender: {
                selector: '[name=gender]',
                converter: function (dir, val) {
                    var dict = {
                        m: 'Мужчина',
                        f: 'Женщина'
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