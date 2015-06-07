;(function (app) {

    app.views.ShoulderIndexView = app.views.FormView.extend({

        onInit: function () {
            this.model = new app.models.ShoulderIndexModel();
        }

    });

} (app));