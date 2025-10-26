from django.core.management.base import BaseCommand
from surgeries.models import Surgery

class Command(BaseCommand):
    help = 'Seed surgeries data (placeholder)'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Seeded surgeries (placeholder)'))
