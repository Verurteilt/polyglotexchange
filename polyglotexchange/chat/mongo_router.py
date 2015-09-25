class MongoRouter(object):
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'mongo_related':
            return 'mongodb'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'mongo_related':
            return 'mongodb'
        return None 