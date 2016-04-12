;(function (app) {

    app.models.PhysicalTabModel = app.models.BaseModel.extend({

        baseFields: {
            age: {
                range: [15, 19],
                msg: 'Вік повинен бути в діапазоні від 15 до 18 років'
            }
            //TODO: investigate unexpected behavior (model doesn't update, only creates)
            //date: {
            //    min: 1,
            //    msg: 'Дата не може бути порожньою!'
            //}
        },

        additionalFields: {},

        initialize: function () {
            this.validation = _.extend({}, this.baseFields, this.additionalFields);
        },

        checkData: function () {
            var isValid;

            this.validationError = this.validate();
            isValid = this.isValid();

            this.isValid() && this.calculate();

            return isValid;
        },

        calculate: function () {}
    });

} (app));