# Generated by Django 3.2.3 on 2021-11-22 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0006_auto_20211122_0942'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='adult',
            field=models.TextField(blank=True),
        ),
    ]
