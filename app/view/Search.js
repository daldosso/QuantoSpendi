Ext.define('QuantoSpendi.view.Search', {
    extend: 'Ext.NavigationView',
    xtype: 'searchContainer',
    config: {
        title: 'Ricerca',
        iconCls: 'search',
        autoDestroy: false,
        items: [{
                xtype: 'searchList'
            }
        ]
    }

});
