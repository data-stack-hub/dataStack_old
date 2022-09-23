app1 = {
    'routes' : [
        {'path':'/index', 'fn':'test'},
        {'path':'/test/<t>', 'fn':'test'},
        {'path':'/query', 'fn':'query'},
        {'path':'/run_fn', 'fn':'run_custom_fn'}
    ],
    'databases':[
        {
        'name':'travestor_firebase',
        'type':'firebase'
        }
    ]
}