Ext.define('QuantoSpendi.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    config: {
        tabBarPosition: 'bottom',
        tabBar: {
            ui: 'gray'
        },
        items: [
            {xclass: 'QuantoSpendi.view.Spese'},
            {xclass: 'QuantoSpendi.view.Categorie'}
        ]
    }
});
