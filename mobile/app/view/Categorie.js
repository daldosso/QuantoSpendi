Ext.define('QuantoSpendi.view.Categorie', {
    extend: 'Ext.NavigationView',
    xtype: 'categorieContainer',
    config: {
        title: 'Categorie',
        iconCls: 'bookmarks',
        autoDestroy: false,
        items: [{
                xtype: 'categorieList'
            }
        ]
    }

});
