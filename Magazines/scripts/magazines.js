(function (global) {
    var app = global.app = global.app || {};

    var MagazinesViewModel = kendo.data.ObservableObject.extend({
        init: function () {
            kendo.data.ObservableObject.fn.init.call(this);

            var el = new Everlive("9bWBbo13WFgt2qxs");
            var expandExpression = { "Cover": true };

            var dataSource = new kendo.data.DataSource({
                type: "everlive",
                transport: {
                    typeName: "Magazines",
                    read: {
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-Everlive-Expand", JSON.stringify(expandExpression))
                        }
                    }
                },
                schema: {
                    model: {
                        id: Everlive.idField,
                        fields: {
                            Name: {
                                field: "Name",
                                defaultValue: ""
                            }
                        },
                        Published: function () {
                            return kendo.toString(this.PublishedDate, "MMMM yyyy");
                        }
                    }
                }
            });


            this.set("magazinesDataSource", dataSource);
        },

        onDataBound: function (e) {
            everliveImages.responsiveAll();
        }
    });

    app.magazinesService = {
        viewModel: new MagazinesViewModel()
    };

})(window);