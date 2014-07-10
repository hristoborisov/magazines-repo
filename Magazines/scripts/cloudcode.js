Everlive.CloudFunction.onRequest(function (request, response, done) {

    var query = new Everlive.Sdk.Query();
    query.select('Name', 'Cover', 'PublishedDate');

    var expandExpression = {
        "Cover": {
            "ReturnAs": "CoverURL",
            "SingleField": "Uri"
        }
    };

    query.expand(expandExpression);

    var magazineType = Everlive.Sdk.$.data('Magazines');
    magazineType.get(query, function (error, data) {

        if (error) {
            response.result = error;
        } else {

            var myNewObject = [];
            for (var i = 0; i < data.result.length; i++) {
                myNewObject[i] = data.result[i];
            }

            var magazineAzureType = Everlive.Sdk.$.data('MagazinesAzure');
            magazineType.get(null, function (error, data) {

                if (error) {
                    response.result = error;
                } else {
                    for (var j = 0; j < data.result.length; j++) {
                        i++;
                        myNewObject[i] = data.result[j];
                    }
                }
            });
            response.result = myNewObject;
        }
        done();
    });
});