Ext.define('QuantoSpendi.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    config: {
        tabBarPosition: 'bottom',
        tabBar: {
            ui: 'gray'
        },
        items: [
            { xclass: 'QuantoSpendi.view.Spese' },
            { xclass: 'QuantoSpendi.view.Search' },
            { xclass: 'QuantoSpendi.view.Categorie' },
            { xclass: 'QuantoSpendi.view.Logout' }
        ]
    }
});
