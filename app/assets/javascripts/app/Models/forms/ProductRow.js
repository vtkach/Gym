;(function (app) {

    app.models.ProductRowModel = app.models.BaseModel.extend({

        defaults: {
            name: '',
            proteins: '',
            fats: '',
            carbohydrates: '',
            calories: ''
        }

    });

} (app));