;(function (win, document, Backbone) {

    win.views.BaseView = Backbone.View.extend({

        events: {
            'click button': 'prevDefault',
            'click .cancel': 'close',
            'keypress [name=datepicker]': 'disableKeyboard'
        },

        extendBinding: _.noop,

        afterRender: _.noop,

        onInit: _.noop,

        initialize: function (options) {
            this._modelBinder = new Backbone.ModelBinder();
            this.tplName = options.tplName;
            this.model = options.model;
            this.onInit();
        },

        prevDefault: function (event) {
            event.preventDefault();
        },

        onClose: function () {
            this._modelBinder.unbind();
        },

        binding: function () {
            this._modelBinder.bind(
                this.model,
                this.el,
                this.constructor.bindings
            );

            this.extendBinding();
        },

        getTemplate: function (tplName) {
            var template = document.querySelector('#' + tplName);

            return document.importNode(template.content, true);
        },

        render: function () {
            this.$el.html(this.getTemplate(this.tplName));
            this.binding();
            this.afterRender();

            return this;
        },

        close: function () {
            this.stopListening();
            this.remove();
            this.onClose();
        },

        showValidationError: function (model, errors) {
            var errorFields = _.keys(errors),
                message = errors[errorFields[0]];

            this.showFlashMessage('danger', message);
        },

        showServerError: function (model, xhr) {
            this.showFlashMessage('danger', xhr.responseJSON.errors);
        },

        showSuccessMessage: function () {
            this.showFlashMessage('success', 'Збережено!');
        },

        showFlashMessage: function (type, message) {
            Backbone.Events.trigger('notification:show-notify', type, message);
        },

        extendEvents: function (events) {
            this.events = _.clone(this.events);

            _.extend(this.events, events);
        },

        dateConverter: function (dir, val) {
            var date = new Date(val);

            return [
                date.getDate(),
                date.getMonth() + 1,
                date.getFullYear()
            ].join('/');
        },

        disableKeyboard: function (e) {
            e.preventDefault();
        }

    });

} (app, document, Backbone));