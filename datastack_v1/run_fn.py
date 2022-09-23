import importlib.util as imputil
import importlib, sys, inspect

def _module_to_namespace(namespace):
    # if isinstance(namespace, ModuleType):
        members = inspect.getmembers(
            namespace, lambda o: inspect.isfunction(o) or isinstance(o, type)
        )
        return {key: mod for key, mod in members}

def run_fn(function_name, code):
    # function_name = request.json['function_name']
    # code = request.json['code']
    print(code)
    spec = imputil.spec_from_loader('my_module', loader=None)
    my_module = importlib.util.module_from_spec(spec)
    exec(code, my_module.__dict__)
    sys.modules['my_module'] = my_module
    namespace  = _module_to_namespace(my_module)
    if 'a' in namespace:
        fn = namespace['a']
        print(fn)
        params = {}
        return {'response': fn(**params)}
    else:
        print('function not found')
        return {'error':'not found'}