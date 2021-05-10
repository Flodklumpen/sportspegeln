"""Adding user_id

Revision ID: 9567c7993700
Revises: 9271b34edf75
Create Date: 2021-05-10 14:00:48.473271

"""
from alembic import op
import sqlalchemy as sa
import os


# revision identifiers, used by Alembic.
revision = '9567c7993700'
down_revision = '9271b34edf75'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('user') as batch_op:
        batch_op.add_column(sa.Column('id', sa.String(length=50), nullable=True))
    instruction = "UPDATE user SET id='{}'".format(os.environ.get("FLASK_APP_TEST_ID"))
    op.execute(instruction)
    with op.batch_alter_table('user') as batch_op:
        batch_op.alter_column('id', nullable=False)


def downgrade():
    with op.batch_alter_table('user') as batch_op:
        batch_op.drop_column('id')
