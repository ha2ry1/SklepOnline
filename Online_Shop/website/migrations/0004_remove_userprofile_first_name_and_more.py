# Generated by Django 5.0 on 2024-01-05 13:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0003_orderstatus_order_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='last_name',
        ),
    ]
