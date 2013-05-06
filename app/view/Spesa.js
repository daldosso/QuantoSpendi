Ext.define('QuantoSpendi.view.Spesa', {
    extend: 'Ext.form.Panel',
    xtype: 'spesa',
    id: 'spesa',
    config: {
        url: 'srv/spesa-add.php',
        title: 'Aggiungi Spesa',
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
                    labelWidth: '35%',
                    picker: {
                        xtype: 'datepicker',
                        slotOrder: ["day", "month", "year"],
                        yearFrom: new Date().getFullYear() - 10,
                        yearTo: new Date().getFullYear() + 10,
                        value: new Date()
                    },
                    dateFormat: 'd/m/Y'
                },
                items: [{
                        xtype: 'hiddenfield',
                        name: 'idSpesa'
                    }, {
                        xtype: 'datepickerfield',
                        destroyPickerOnHide: true,
                        name: 'data',
                        label: 'Data',
                        value: new Date()
                    }, {
                        xtype: 'numberfield',
                        name: 'importo',
                        label: 'Importo €',
                        clearIcon: true
                    }, {
                        xtype: 'selectfield',
                        name: 'categoria',
                        label: 'Categoria',
                        store: 'Categorie',
                        displayField: 'descrizione',
                        valueField: 'idCategoria',
                        autoSelect: false
                    }, {
                        xtype: 'textareafield',
                        name: 'note',
                        label: 'Note'
                    }
                ]}]


    }

});
