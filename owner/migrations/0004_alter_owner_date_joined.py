# Generated by Django 4.2.6 on 2023-10-15 02:46

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('owner', '0003_alter_owner_date_joined'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='date_joined',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]