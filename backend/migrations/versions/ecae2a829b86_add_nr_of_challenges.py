"""Add nr of challenges

Revision ID: ecae2a829b86
Revises: 37ee87838fef
Create Date: 2021-06-14 22:12:19.222959

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ecae2a829b86'
down_revision = '37ee87838fef'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('competing') as batch_op:
        batch_op.add_column(sa.Column('nr_of_challenges', sa.Integer()))


def downgrade():
    with op.batch_alter_table('competing') as batch_op:
        batch_op.drop_column('nr_of_challenges')
