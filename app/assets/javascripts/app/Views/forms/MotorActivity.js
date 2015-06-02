;(function (app) {

    app.views.MotorActivityView = app.helpers.FormView.extend({

        events: {
            'click .glyphicon-plus': 'addRow'
        },

        addRow: function () {
            this.collection.add({});
        },

        onInit: function () {
            var viewFactory = new Backbone.CollectionBinder.ViewManagerFactory(this.getActivityView);

            this.collection = new app.collections.ActivityCollection(new app.models.ActivityRowModel);
            this._collectionBinder = new Backbone.CollectionBinder(viewFactory);
        },

        getActivityView: function (model) {
            return new app.views.ActivityRowView({
                tplName: 'activity-row',
                model: model
            });
        },

        afterRender: function () {
            var circleRadii = [11, 25, 31, 13, 20];

            this._collectionBinder.bind(this.collection, this.$('.activities'));
            var svgContainer = d3.select("body")
                .append("svg")
                .attr("width", 600)
                .attr("height", 100);

            var circles = svgContainer.selectAll("circle")
                .data(circleRadii)
                .enter()
                .append("circle");

            var circleAttributes = circles
                .attr("cx", 50)
                .attr("cy", 50)
                .attr("r", function (d) { return d; })
                .style("fill", function (d) {
                    var returnColor;

                    if (d === 40) {
                        returnColor = "green";
                    } else if (d === 20) {
                        returnColor = "purple";
                    } else if (d === 10) {
                        returnColor = "red";
                    }

                    return returnColor;
                });
        }

    });

} (app));