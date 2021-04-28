"""Adding time_reported into match.

Revision ID: 9271b34edf75
Revises: 3f6234bc8f42
Create Date: 2021-04-28 15:28:17.361135

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9271b34edf75'
down_revision = '3f6234bc8f42'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('match') as batch_op:
        batch_op.alter_column('time', new_column_name='time_played')
        batch_op.alter_column('date', new_column_name='date_played')
        batch_op.add_column(sa.Column('timestamp_reported', sa.DateTime(), nullable=True))


def downgrade():
    with op.batch_alter_table('match') as batch_op:
        batch_op.alter_column('time_played', new_column_name='time')
        batch_op.alter_column('date_played', new_column_name='date')
        batch_op.drop_column('timestamp_reported')
