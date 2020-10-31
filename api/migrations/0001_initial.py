# Generated by Django 3.1.2 on 2020-10-31 18:20

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('image', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('gpa', models.DecimalField(decimal_places=2, max_digits=3)),
                ('image', models.CharField(max_length=255)),
                ('school', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='students', to='api.school')),
            ],
        ),
    ]