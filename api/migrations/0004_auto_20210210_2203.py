# Generated by Django 3.1.2 on 2021-02-10 22:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210210_2140'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='school',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.school'),
        ),
    ]
