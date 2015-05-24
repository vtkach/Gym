;(function (app) {

    app.models.AuthorizationModel = Backbone.Model.extend({

        defaults: {
            email: '',
            password: ''
        }

    });

} (app));