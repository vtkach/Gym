;(function (app) {

    app.views.ShoulderIndexView = app.views.PhysicalTabView.extend({

        onInit: function () {
            this.model = new app.models.ShoulderIndexModel();
        }

    });

} (app));