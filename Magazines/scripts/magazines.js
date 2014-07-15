(function (global) {
    var app = global.app = global.app || {};

    var MagazinesViewModel = kendo.data.ObservableObject.extend({
        magazinesDataSource: null,

        init: function () {
            kendo.data.ObservableObject.fn.init.call(this);

            // initialize the Backend Services SDK with an API Key
            var el = new Everlive("9bWBbo13WFgt2qxs");

            // retrieve the image URL from the Files table using expand
            var expandExpression = {
                "Cover": {
                    "ReturnAs": "CoverURL",
                    "SingleField": "Uri"
                }
            };

            // retrieve a subset of the fields to optimize the payload
            var filterExpression = {
                "Name": 1,
                "PublishedDate": 1,
                "Cover": 1
            };

            var dataSource = new kendo.data.DataSource({
                type: "everlive",
                transport: {
                    typeName: "Magazines",
                    read: {
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-Everlive-Expand", JSON.stringify(expandExpression));
                            xhr.setRequestHeader("X-Everlive-Fields", JSON.stringify(filterExpression));
                        }
                    }
                },
                schema: {
                    model: {
                        PublishedOn: function () {
                            return kendo.toString(this.PublishedDate, "MMMM yyyy");
                        }
                    }
                }
            });

            this.set("magazinesDataSource", dataSource);
        },

        onDataBound: function (e) {
            everliveImages.responsiveAll();
        },

        onItemClick: function (e) {
            app.application.navigate("#details?id=" + e.dataItem.id);
        },

        onItemViewShow: function (e) {
            var itemId = e.view.params.id;
            var viewModel = app.magazinesService.viewModel.magazinesDataSource.get(itemId);

            kendo.bind(e.view.element, viewModel);
            everliveImages.responsiveAll();
        }
    });

    app.magazinesService = {
        viewModel: new MagazinesViewModel()
    };
})(window);
