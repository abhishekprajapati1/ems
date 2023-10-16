from django.db import models, transaction, IntegrityError
from owner.models import Owner



class BranchManager(models.Manager):
    def active(self):
        return self.filter(is_deleted = False)




BRANCH_TYPES = [
    ('storage', 'Storage'),
    ('shop', 'Shop')
]

class Branch(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    address = models.TextField(blank=True, null=True)
    established_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    branch_type = models.CharField(max_length=10, choices=BRANCH_TYPES, default='storage')
    objects = BranchManager()
    # Define a JSON field for opening hours
    opening_hours = models.JSONField(default=list, help_text="List of opening hours for the branch")
    contacts = models.JSONField(default=list, help_text="List of contact information for the branch")

    def save(self, *args, **kwargs):
        # Ensure case-insensitive uniqueness within the user's scope
        try:
            with transaction.atomic():
                # Ensure unique case-insensitive name
                existing_branch = Branch.objects.filter(owner=self.owner, name__iexact=self.name)
                if existing_branch.exists():
                    raise IntegrityError('Branch name must be unique within your scope.')

                super(Branch, self).save(*args, **kwargs)
        except IntegrityError as e:
            raise e


    def __str__(self):
        return self.name