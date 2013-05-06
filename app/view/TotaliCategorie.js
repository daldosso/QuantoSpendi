Ext.define('QuantoSpendi.view.TotaliCategorie', {
    extend: 'Ext.List',
    xtype: 'totaliCategorie',
    config: {
        title: 'Totali categorie',
        store: 'TotaliCategorie',
        itemTpl: [
            '<span style="float: left; width: 150px">{descrizione}:</span> <b>&nbsp;&nbsp;&nbsp;{importo} €</b>'
        ],
        items: []
    }

});


