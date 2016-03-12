/**
 * Created by Administrator on 2015/10/29.
 */

define(['jquery', 'backbone', '../user/addressModel', './templates'], function ($, Backbone, AddressModel, templates) {
    return Backbone.View.extend({
        locationTemplate: templates.LocationViewTemplate,
        locationModel: new AddressModel(),
        render: function () {
            this.loadLocation();
        },
        loadLocation: function () {
            var self = this;

            this.locationModel.fetch({
                data: {id: 1930},
                success: function () {
                    $('.searchLocation').html(self.locationTemplate({county: self.locationModel.get('county')}));
                }
            })
        }
    });
});