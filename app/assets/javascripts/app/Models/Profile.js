;(function (app) {

    app.models.ProfileModel = app.models.BaseModel.extend({

        url: '/profile',

        defaults: {
            lastName: '',
            firstName: '',
            surname: '',
            gender: 'm',
            school: '',
            group: '',
            household: '',
            age: 15
        }

    });

} (app));