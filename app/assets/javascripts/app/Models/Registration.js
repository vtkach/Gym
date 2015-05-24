;(function (app) {

    app.models.RegistrationModel = app.helpers.BaseModel.extend({

        defaults: {
            email: '',
            password: '',
            password_confirmation: ''
        }

    });

} (app));