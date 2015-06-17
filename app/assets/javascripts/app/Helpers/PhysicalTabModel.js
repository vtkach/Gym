;(function (app) {

    app.models.PhysicalTabModel = app.models.BaseModel.extend({

        baseFields: {
            age: {
                range: [5, 150],
                msg: 'Вік повинен бути в діапазоні від 5 до 150 років'
            },

            date: {
                required: true,
                msg: 'Дата не може бути порожньою!'
            }
        },

        additionalFields: {},

        validation: function () {
            return _.extend({}, this.baseFields, this.additionalFields);
        },

        checkData: function () {
            this.validate();

            this.isValid() && this.calculate();
        }
    });

} (app));