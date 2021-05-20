"""Adding rank columns

Revision ID: 94f488ca7b41
Revises: 9567c7993700
Create Date: 2021-05-19 11:13:35.380251

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '94f488ca7b41'
down_revision = '9567c7993700'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('tournament') as batch_op:
        batch_op.add_column(sa.Column('leader', sa.String(length=120), nullable=True))
        batch_op.create_foreign_key('fk_tour_leader', 'competitor', ['leader'], ['email'])
    with op.batch_alter_table('user') as batch_op:
        batch_op.add_column(sa.Column('rank_after', sa.String(length=120), nullable=True))
        batch_op.add_column(sa.Column('rank_before', sa.String(length=120), nullable=True))
        batch_op.create_foreign_key('fk_user_rbefore', 'competitor', ['rank_before'], ['email'])
        batch_op.create_foreign_key('fk_user_rafter', 'competitor', ['rank_after'], ['email'])


def downgrade():
    with op.batch_alter_table('user') as batch_op:
        batch_op.drop_constraint('fk_user_rbefore', type_='foreignkey')
        batch_op.drop_constraint('fk_user_rafter', type_='foreignkey')
        batch_op.drop_column('rank_before')
        batch_op.drop_column('rank_after')
    with op.batch_alter_table('tournament') as batch_op:
        batch_op.drop_constraint('fk_tour_leader', type_='foreignkey')
        batch_op.drop_column('leader')
