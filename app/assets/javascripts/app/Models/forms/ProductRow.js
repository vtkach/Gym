;(function (app) {

    app.models.ProductRowModel = app.models.BaseModel.extend({

        defaults: {
            name: '',
            proteins: '',
            fats: '',
            calories: '',
            carbohydrates: '',
            count: 0,
            calculatedProteins: 0,
            calculatedFats: 0,
            calculatedCalories: 0,
            calculatedCarbohydrates: 0
        },

        calculate: function (inputVal) {
            var val = inputVal / 100;

            this.set({
                count: inputVal,
                calculatedProteins: parseInt(this.get('proteins') * val, 10) ,
                calculatedFats: parseInt(this.get('fats') * val, 10),
                calculatedCalories: parseInt(this.get('calories') * val, 10),
                calculatedCarbohydrates: parseInt(this.get('carbohydrates') * val, 10)
            });
        }
    });

} (app));