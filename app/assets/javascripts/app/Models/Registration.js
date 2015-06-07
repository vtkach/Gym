;(function (app) {

    app.models.RegistrationModel = app.models.BaseModel.extend({

        defaults: {
            email: '',
            password: '',
            password_confirmation: ''
        }

    });

} (app));