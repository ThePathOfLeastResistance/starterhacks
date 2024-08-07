# Generated by Django 4.2.7 on 2024-07-28 05:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_imagesnapshot_remove_dancerimage_dance_sequence_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagesnapshot',
            name='dance_sequence',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.dancesequence'),
        ),
        migrations.AlterField(
            model_name='imagesnapshot',
            name='dancer_image',
            field=models.TextField(),
        ),
    ]
