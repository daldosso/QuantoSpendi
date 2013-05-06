Ext.define('QuantoSpendi.view.Spese', {
    extend: 'Ext.NavigationView',
    xtype: 'speseContainer',
    config: {
        title: 'Spese',
        iconCls: 'compose',
        autoDestroy: false,
        items: [{
                xtype: 'speseList'
            }
        ]
    }

});
