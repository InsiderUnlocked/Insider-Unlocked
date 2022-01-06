from django.db.models import signals
from django.dispatch import dispatcher

def tradesCount(sender, instance, signal, *args, **kwargs):
    # Runs through all the change types and adds up their current numbers
    from .models import CongressPerson
    for change_type in CongressPerson.objects.all():
        change_type.tradesCount()