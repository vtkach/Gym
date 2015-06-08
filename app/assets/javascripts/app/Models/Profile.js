;(function (app) {

    app.models.ProfileModel = app.models.BaseModel.extend({

        url: '/profile',

        defaults: {
            lastName: 'Tkachenko',
            firstName: 'Victor',
            surname: 'Alexsandrovich',
            gender: 'm',
            school: '67',
            group: 'kmp',
            household: 'есть',
            age: 15
        }

    });

} (app));