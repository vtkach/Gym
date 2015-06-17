;(function (app) {

    app.models.PhysicalTabModel = app.models.BaseModel.extend({

        initialize: function () {
            this.validation = _.extend({}, this.baseFields, this.additionalFields);

        },

        baseFields: {
            age: {
                range: [5, 150],
                msg: 'Вік повинен бути в діапазоні від 5 до 150 років'
            }
            //TODO: investigate unexpected behavior (model doesn't update, only creates)
            //date: {
            //    min: 1,
            //    msg: 'Дата не може бути порожньою!'
            //}
        },

        additionalFields: {},

        checkData: function () {
            this.validate();

            this.isValid() && this.calculate();
        }
    });

} (app));