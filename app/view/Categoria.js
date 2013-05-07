Ext.define('QuantoSpendi.view.Categoria', {
    extend: 'Ext.form.Panel',
    xtype: 'categoria',
    config: {
        url: 'srv/categoria-add.php',
        title: 'Aggiungi Categoria',
        items: [{
                xtype: 'toolbar',
                docked: 'top',
                items: [{
                        xtype: 'spacer'
                    }, {
                        text: 'Conferma',
                        action: 'confirm'
                    }]
            }, {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%'
                },
                items: [{
                        xtype: 'textfield',
                        name: 'descrizione',
                        label: 'Descrizione',
                        clearIcon: true
                    }
                ]}]
    }

});
