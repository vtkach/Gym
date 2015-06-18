;(function (app) {

    app.models.ProfileModel = app.models.BaseModel.extend({

        url: '/profile',

        defaults: {
            lastName: '',
            firstName: '',
            surname: '',
            gender: '',
            school: '',
            group: '',
            household: '',
            age: ''
        }

    });

} (app));