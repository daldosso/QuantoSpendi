Ext.define('QuantoSpendi.view.TotaliCategorie', {
    extend: 'Ext.List',
    xtype: 'totaliCategorie',
    config: {
        title: 'Totali categorie',
        store: 'TotaliCategorie',
        itemTpl: [
            '<div style="display: inline">{descrizione}:</div>',
            '<div style="font-weight: bold; text-align: right; display: inline; float: right">{importo} €</div>'
        ],
        items: []
    }

});


