;(function (app) {

    app.models.ProfileModel = app.helpers.BaseModel.extend({

        url: '/profile',

        defaults: {
            lastName: '',
            firstName: '',
            surname: '',
            gender: '',
            school: '',
            group: '',
            household: ''
        }

    });

} (app));