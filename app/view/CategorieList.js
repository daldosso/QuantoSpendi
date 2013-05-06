Ext.define('QuantoSpendi.view.CategorieList', {
    extend: 'Ext.List',
    xtype: 'categorieList',
    config: {
        title: 'Categorie',
        store: 'Categorie',
        itemTpl: [
            '{descrizione}'
        ],
        items: [{
                xtype: 'toolbar',
                docked: 'top',
                items: [{
                        xtype: 'spacer'
                    }, {
                        xtype: 'button',
                        text: '<span style="font-size: 16px">+</span>',
                        action: 'addCategoria',
                        ui: 'normal',
                        height: 32,
                        width: 32
                    }]
            }]
    }

});
