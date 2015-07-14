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
                calculatedProteins: this.parseCalculatedResult(this.get('proteins') * val) ,
                calculatedFats: this.parseCalculatedResult(this.get('fats') * val),
                calculatedCalories: this.parseCalculatedResult(this.get('calories') * val),
                calculatedCarbohydrates: this.parseCalculatedResult(this.get('carbohydrates') * val)
            });
        },

        parseCalculatedResult: function (value) {
            return parseInt(value, 10);
        }
    });

} (app));