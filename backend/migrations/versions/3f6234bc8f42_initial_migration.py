"""Initial migration.

Revision ID: 3f6234bc8f42
Revises: 
Create Date: 2021-04-19 20:29:42.383019

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '3f6234bc8f42'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('user',
                    sa.Column('email', sa.String(length=120), nullable=False),
                    sa.Column('first_name', sa.String(length=50), nullable=False),
                    sa.Column('family_name', sa.String(length=50), nullable=False),
                    sa.PrimaryKeyConstraint('email')
                    )
    op.create_table('competitor',
                    sa.Column('email', sa.String(length=120), nullable=False),
                    sa.ForeignKeyConstraint(['email'], ['user.email'], ),
                    sa.PrimaryKeyConstraint('email')
                    )
    op.create_table('owner',
                    sa.Column('email', sa.String(length=120), nullable=False),
                    sa.ForeignKeyConstraint(['email'], ['user.email'], ),
                    sa.PrimaryKeyConstraint('email')
                    )
    op.create_table('tournament',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=50), nullable=False),
                    sa.Column('start_date', sa.DateTime(), nullable=False),
                    sa.Column('end_date', sa.DateTime(), nullable=True),
                    sa.Column('owner', sa.String(length=120), nullable=False),
                    sa.ForeignKeyConstraint(['owner'], ['owner.email'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('competing',
                    sa.Column('competitor', sa.String(length=120), nullable=False),
                    sa.Column('tournament', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['competitor'], ['competitor.email'], ),
                    sa.ForeignKeyConstraint(['tournament'], ['tournament.id'], ),
                    sa.PrimaryKeyConstraint('competitor', 'tournament')
                    )
    op.create_table('match',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('tournament', sa.Integer(), nullable=False),
                    sa.Column('date', sa.Date(), nullable=True),
                    sa.Column('time', sa.Time(), nullable=True),
                    sa.Column('challenger', sa.String(length=120), nullable=False),
                    sa.Column('defender', sa.String(length=120), nullable=False),
                    sa.Column('score_challenger', sa.Integer(), nullable=True),
                    sa.Column('score_defender', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['challenger'], ['competitor.email'], ),
                    sa.ForeignKeyConstraint(['defender'], ['competitor.email'], ),
                    sa.ForeignKeyConstraint(['tournament'], ['tournament.id'], ),
                    sa.PrimaryKeyConstraint('id', 'tournament')
                    )


def downgrade():
    op.drop_table('match')
    op.drop_table('competing')
    op.drop_table('tournament')
    op.drop_table('owner')
    op.drop_table('competitor')
    op.drop_table('user')
